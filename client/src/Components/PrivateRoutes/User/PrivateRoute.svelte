<script>
  import { Route } from 'svelte-navigator';
  import PrivateRouteGuard from './PrivateRouteGuard.svelte';

  export let path;
</script>

<Route {path}>
  <PrivateRouteGuard>
    <slot />
  </PrivateRouteGuard>
</Route>
