## Design

Follow `~/.claude/design/blueprint/DESIGN.md` for all UI work on this site.

It is the approved look: warm paper ground, JetBrains Mono throughout including the
headline, a dot matrix with column hairlines, structure by 1px hairline only, zero border
radius, one blue accent, no shadows or gradients. A working page built to the brief sits
at `~/.claude/design/blueprint/reference.html`.

The site's current styling predates the brief and does not follow it. Ask before
restyling existing pages; apply the brief to new work.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
