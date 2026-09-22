import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { inlineSvg } from './src/plugins/inline-svg.mjs';

export default defineConfig({
  site: 'https://iemrani.com',
  output: 'static',
  // satteri is Astro's default markdown processor; it is named here only to hand it
  // the plugin. Pinned to the exact version astro itself depends on.
  markdown: {
    processor: satteri({ hastPlugins: [inlineSvg()] }),
  },
});
