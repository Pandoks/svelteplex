<script lang="ts">
  import { resolve } from '$app/paths';
  import { Badge } from '@svelteplex/svelte/shadcn/badge';
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
  <div class="-mt-20 flex flex-col items-center">
    <Badge
      class="border-neutral-300 bg-white/75 px-4 py-1 text-sm text-neutral-600"
      variant="outline"
    >
      Mono
    </Badge>
    <h1 class="font-garamond -mt-2 text-9xl font-medium">SveltePlex</h1>
    <h2 class="font-garamond mt-5 text-lg">Monorepo for Everything Svelte</h2>
    <a href={resolve('/second')} class="mt-4 text-neutral-500 underline hover:text-neutral-800">
      Go to the second route
    </a>
  </div>
</div>
