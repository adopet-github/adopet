<script>
  import { useLocation, useNavigate } from 'svelte-navigator';
  import { userCredentials } from '../../../Stores/userCredentials';

  const navigate = useNavigate();
  const location = useLocation();

  $: if ($userCredentials) {
    if ($userCredentials.name) {
      navigate('/shelter/dashboard');
    } else {
      navigate('/user/swipe');
    }
  }
</script>

{#if !$userCredentials}
  <slot />
{/if}
