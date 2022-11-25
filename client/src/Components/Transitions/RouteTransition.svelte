<script lang="ts">
  import { fly } from 'svelte/transition';

  export let x = 500;
  export let duration = 1000;
  export let direction: 'forward' | 'backward' = 'forward';

  $: directionFactor = direction === 'forward' ? 1 : -1;
</script>

<div
  class="route-wrapper"
  in:fly={{ x: x * directionFactor, duration }}
  out:fly={{ x: x * directionFactor, duration }}
>
  <slot />
</div>

<style>
  .route-wrapper {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
</style>
