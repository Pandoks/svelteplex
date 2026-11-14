<script lang="ts">
  import '#lib/styles/fonts.css';
  import '../app.css';
  import type { LayoutProps } from './$types';

  const { children }: LayoutProps = $props();
</script>

{@render children()}
