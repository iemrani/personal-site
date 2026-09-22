// Markdown plugin: replace `![alt](/path/fig.svg)` with the SVG itself.
//
// An <img> of an SVG is a sealed picture: its labels cannot be selected and it cannot
// load the page's web font. Inlined, the labels are real text and the type scale in
// the article's CSS applies to them.
//
// The files live in public/, so the markdown path is also the file's URL. They are
// produced by ~/.claude/design/blueprint/fig-svg.py from the figure sources.
//
// Ids are prefixed per file. Figures reuse `arrow` and `arrow-accent` as marker ids,
// and on one page every `url(#arrow)` would bind to the FIRST definition in the
// document, so figure 3 would quietly draw figure 1's arrowheads.
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

const PUBLIC = new URL('../../public/', import.meta.url);

function namespace(svg, prefix) {
  const ids = [...svg.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  let out = svg;
  for (const id of ids) {
    const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out
      .replace(new RegExp(`\\bid="${esc}"`, 'g'), `id="${prefix}${id}"`)
      .replace(new RegExp(`url\\(#${esc}\\)`, 'g'), `url(#${prefix}${id})`)
      .replace(new RegExp(`href="#${esc}"`, 'g'), `href="#${prefix}${id}"`)
      // aria-labelledby / aria-describedby hold space-separated id lists.
      .replace(/(aria-(?:labelledby|describedby)=")([^"]*)(")/g, (_, a, list, z) =>
        a + list.split(/\s+/).map((t) => (t === id ? prefix + id : t)).join(' ') + z);
  }
  return out;
}

export function inlineSvg() {
  return {
    name: 'inline-svg',
    element: {
      filter: ['img'],
      visit(node) {
        const src = node.properties?.src;
        if (typeof src !== 'string' || !src.startsWith('/') || !src.endsWith('.svg')) return;
        const file = new URL(decodeURI(src.slice(1)), PUBLIC);
        // A missing file should fail the build, not ship a page with a hole in it.
        const svg = readFileSync(file, 'utf8').trim();
        return { type: 'raw', value: namespace(svg, basename(src, '.svg') + '--') };
      },
    },
  };
}
