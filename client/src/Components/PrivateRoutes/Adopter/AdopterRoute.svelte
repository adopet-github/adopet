<script>
  import { Route } from 'svelte-navigator';
  import AdopterRouteGuard from './AdopterRouteGuard.svelte';

  export let path;
</script>

<Route {path}>
  <AdopterRouteGuard>
    <slot />
  </AdopterRouteGuard>
</Route>
