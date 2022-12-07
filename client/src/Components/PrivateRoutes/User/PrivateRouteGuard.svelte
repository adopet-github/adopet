<script>
  import { useNavigate } from 'svelte-navigator';
  import { userCredentials } from '../../../Stores/userCredentials';

  const navigate = useNavigate();

  $: if (!$userCredentials) {
    navigate('/login');
  }
</script>

{#if $userCredentials}
  <slot />
{/if}
