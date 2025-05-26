<script lang="ts">
  import { enhance } from '$app/forms';
  import { Badge } from '@lib/components/ui/badge';
  import { Input } from '@lib/components/ui/input';
  import { Button } from '@lib/components/ui/button';
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
  </div>

  <form class="flex" use:enhance>
    <Input placeholder="" id="email" type="email" />
    <Button type="submit">Submit</Button>
  </form>
</div>
