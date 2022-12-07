<script>
  import { Route } from 'svelte-navigator';
  import ShelterRouteGuard from './ShelterRouteGuard.svelte';

  export let path;
</script>

<Route {path}>
  <ShelterRouteGuard>
    <slot />
  </ShelterRouteGuard>
</Route>
