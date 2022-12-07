<script>
  import { useNavigate } from 'svelte-navigator';
  import { userCredentials } from '../../../Stores/userCredentials';

  const navigate = useNavigate();

  $: if (!$userCredentials?.name) {
    if (!$userCredentials) {
      navigate('/login');
    } else {
      navigate('/user/swipe');
    }
  }
</script>

{#if $userCredentials}
  <slot />
{/if}
