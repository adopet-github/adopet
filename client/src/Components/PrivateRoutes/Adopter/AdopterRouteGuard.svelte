<script>
  import { useNavigate } from 'svelte-navigator';
  import { userCredentials } from '../../../Stores/userCredentials';

  const navigate = useNavigate();

  $: if (!$userCredentials?.first_name) {
    if (!$userCredentials) {
      navigate('/login');
    } else {
      navigate('/shelter/dashboard');
    }
  }
</script>

{#if $userCredentials}
  <slot />
{/if}
