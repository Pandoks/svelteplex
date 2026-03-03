<script lang="ts">
  import { resolve } from '$app/paths';
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
  <div class="-mt-20 flex flex-col items-center">
    <h1 class="font-garamond text-5xl font-medium">Second Route</h1>
    <p class="mt-4 text-neutral-500">This page is for navigation testing in the packaged app.</p>
    <a href={resolve('/')} class="mt-4 text-neutral-500 underline hover:text-neutral-800">
      Back to home
    </a>
  </div>
</div>
