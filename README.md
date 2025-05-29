# SveltePlex

This is a monorepo template for SvelteKit apps. It shows you the basics of how to set up a Svelte
component library, and how to use it in a SvelteKit app throughout a monorepo setup.

This monorepo uses [shadcn-svelte](https://next.shadcn-svelte.com/) as a component library and
static `woff2` files to show examples of how to import them throughout a monorepo.

**Everything this monorepo includes**:

- A normal SvelteKit app
- An Electron [SveltronKit](https://github.com/Pandoks/sveltronkit) app
- A Shadcn-Svelte component library that's shared across the monorepo
- Static files that can be shared across the monorepo

## Structure

```tree
.
├── apps
│   ├── desktop
│   ├── mobile.md
│   └── web
├── packages
│   └── svelte
│       ├── src
│       │   ├── lib
│       │   │   ├── components
│       │   │   │   ├── ui/
│       │   │   └── styles
│       │   │       └── fonts.css
│       │   ├── index.ts
│       │   └── utils.ts
│       ├── static
│       │   ├── fonts/
│       │   └── favicon.png
```

- The `apps` directory contains the SvelteKit apps that are meant to be served in production.
- The `packages` directory contains the shared libraries that are used across the monorepo.
  - In our case, we have database and svelte libraries.

## Vite Modifications

Because we're importing files from another directory that is out of the scope of the vite project,
we need to allow vite to access files outside of the project directory (the rest of the monorepo).

Add the following to the `vite.config.ts` of the app:

```ts
// vite.config.ts
export default defineConfig({
  server: {
    fs: {
      allow: ['../../'] // point this to the root of the monorepo
    }
  }
});
```

## Shadcn-Svelte

Currently, in the monorepo, every `package.json` has a `shadcn` script that runs
`pnpm dlx shadcn-svelte@next add $@` in the `packages/svelte` directory. This is so that you can
install `shadcn-svelte` components from any workspace in the monorepo just like you do a normal
`npm` package, but the contents will always be installs in the `packages/svelte` directory.

The `packages/svelte` component library then exports the `shadcn` components so that you can import
them in other packages:

```json
// package.json
"exports": {
  "./shadcn/*": "./src/lib/components/ui/*/index.js",
  "./shadcn/css": "./src/app.css",
  "./styles/*": "./src/lib/styles/*.css"
}
```

You can read more in [here](./packages/svelte/README.md).

## Using Shadcn-Svelte Components

Being able to use `shadcn-svelte` components in other packages is kind of convoluted due to
limitations in SvelteKit, Vite, and `shadcn-svelte` itself, but I'll try to explain the process
here.

We can already use `shadcn-svelte` components in other packages in the monorepo since we export them
from the `packages/svelte` directory. We import them into apps by adding
`"@svelteplex/svelte": "workspace:*"` to the `dependencies` in the `package.json` of the app. The
problem is that the utilities and the styles that the `packages/svelte` components need aren't
imported correctly.

We fix that by first using `@lib` imports within the `packages/svelte` directory instead of `$lib`.
Again, you can read more about this in the `packages/svelte` README. When we use `packages/svelte`
component, we need to add the following the app's `svelte.config.js`:

```js
// svelte.config.js
alias: {
  '@lib': '../../packages/svelte/src/lib',
  '@lib/*': '../../packages/svelte/src/lib/*'
}
```

Because we're using `@lib` imports, exclusively in the `shadcn-svelte` components, we can point them
directly to the `packages/svelte` directory relative to the app's `svelte.config.js`. This will
resolve imports within the `shadcn-svelte` components correctly.

The next thing we have to do is import the styles correctly. Again, you can already import the
styles because we export them from the `packages/svelte` package:

```
  "./shadcn/css": "./src/app.css",
```

Within the app's `app.css`, all you have to do is import:

```
@import '@svelteplex/svelte/shadcn/css';
```

The problem now is that `tailwindcss` needs to discover these files so that it can parse the class
names and import the styles correctly. _They do this so that they can packages the smallest CSS
possible._ Right now, `tailwindcss` is only looking within the app's directory for files, so it will
never import the styles neeeded by the `shadcn-svelte` components. To fix this we need to add:

```
@source '../../../packages/svelte/src/**/*.{html,js,svelte,ts}';
```

to the `app.css` file (or wherever the relative path is to the `packages/svelte` directory). This
will tell `tailwindcss` to also look in the `packages/svelte` directory for files that it needs to
parse.

## Sharing Static Files

In this monorepo, we have custom font files that we want to share across the monorepo. We have a
`fonts.css` file in `packages/svelte` that is imported in apps across the monorepo. The problem is
that the `fonts.css` file is referencing `woff2` files that are in the `static` directory of the
`packages/svelte` package. When importing the `fonts.css` file, the apps that use it don't have
access to these static files. We need to some how tell the app where these files are located.

We will fix this by using `vite-plugin-static-copy` resolve this. We add the following to the
`vite.config.ts` of the app:

```ts
export default defineConfig({
  plugins: [
    ...
    viteStaticCopy({
      // don't point to static directory, point to finished build directory (static -> / after build)
      targets: [{ src: '../../packages/svelte/static/fonts/*', dest: 'fonts' }]
    })
  ],
...
```

The `src` points to the location of the static files relative to the app's `svelte.config.js`. _Note
however_ that the `dest` points to the location of where the static files are `vite build` to
instead of the location of the `static` directory of Sveltekit.
