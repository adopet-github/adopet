<script>
  import { Route } from 'svelte-navigator';
  import UnauthorizedRouteGuard from './UnauthorizedRouteGuard.svelte';

  export let path;
</script>

<Route {path}>
  <UnauthorizedRouteGuard>
    <slot />
  </UnauthorizedRouteGuard>
</Route>
