# Svelte library

This is a component library that is shared across this monorepo. When you add something new,
remember to add it to the exports in `package.json` in this package.

> [!IMPORTANT] 
> Instead of using `$lib`, use `@lib` instead. This is so that you can reference this
> package in `svelte.config.js` in other packages. If you were to use `$lib`, other packages would
> look into their own `$lib` instead of this package which may not contain the necessary code.

This component library houses all the `shadcn-svelte` components.

For static files, put them in the `static` directory, and they can be shared across the monorepo.

## Devlopment

The `routes` is meant for you to test out components in isolation so that you can see how they look.
They are not meant to be exported and used in other packages.
