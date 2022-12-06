<script lang="ts">
  import { useNavigate } from 'svelte-navigator';
  import { logOut } from '../../Services/auth';
  const navigate = useNavigate();
  const handleLogOut = async () => {
    await logOut();
    navigate('/');
  };
</script>

<button on:click={handleLogOut}>LOG OUT</button>

<style>
  button {
    background: none;
    font-size: 16px;
    color: #f8e5e6;
    font-family: 'Satoshi-Variable';
    outline: none;
    padding: 15px;
  }

  @media only screen and (max-width: 688px) {
    button {
      padding: 10px;
      font-size: 0.8rem;
    }
  }
</style>
