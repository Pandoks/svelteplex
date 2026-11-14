# Svelte library

This is a component library that is shared across this monorepo. When you add something new,
remember to add it to the exports in `package.json` in this package.

<!-- prettier-ignore -->
> [!IMPORTANT]
> Apps import this package by name (`@svelteplex/svelte/...`) through its `exports`. Inside this
> package, import with `#lib/...` and explicit file extensions (the `imports` map in
> `package.json`), which `components.json` makes `shadcn-svelte` generate.

This component library houses all the `shadcn-svelte` components (add more with
`pnpm shadcn <component>` from the repo root).

For static files, put them in the `static` directory, and they can be shared across the monorepo.

## Development

The `routes` is meant for you to test out components in isolation so that you can see how they look.
They are not meant to be exported and used in other packages.
