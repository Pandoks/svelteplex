import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: '.vite/renderer/main_window'
    }),
    router: {
      type: 'hash'
    },
    alias: {
      '@lib': '../../packages/svelte/src/lib',
      '@lib/*': '../../packages/svelte/src/lib/*'
    }
  }
};

export default config;
