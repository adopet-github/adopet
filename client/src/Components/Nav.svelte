<script lang="ts">
  // ASSETS
  import logoImg from '../assets/imgs/img_logo.svg';
  import logoText from '../assets/imgs/text_logo.svg';

  // UTILS
  import { Link } from 'svelte-navigator';
  import { userCredentials } from '../Stores/userCredentials';

  // COMPONENTS
  import LogOut from './Inputs/LogOut.svelte';
</script>

<nav>
  <div class="nav-logo">
    <Link to="/">
      <div class="logo-container">
        <img src={logoImg} alt="adopet logo" />
        <img src={logoText} alt="adopet" class="logoText" />
      </div>
    </Link>
  </div>
  <div class="links">
    {#if $userCredentials}
      {#if $userCredentials.house_type}
        <Link to="/user/swipe"><span>SWIPE</span></Link>
        <Link to="/user/matches"><span>MATCHES</span></Link>
      {:else}
        <Link to="/shelter/dashboard"><span>DASHBOARD</span></Link>
      {/if}
      <Link to="/settings"><span>SETTINGS</span></Link>
      <LogOut />
    {:else}
      <Link to="/login"><span>LOGIN</span></Link>
      <Link to="/register"><span>REGISTER</span></Link>
    {/if}
  </div>
</nav>

<style>
  nav {
    height: 8vh;
    background: #d33e43;
    background: linear-gradient(180deg, #d33e43 0%, #a52327 100%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
  .logo-container {
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
  }
  img {
    height: 50px;
    margin-right: 10px;
    padding: 5px;
  }
  .logoText {
    position: relative;
    top: 2px;
  }
  span {
    padding: 15px;
  }

  @media only screen and (max-width: 688px) {
    .logoText {
      display: none;
    }
    span {
      padding: 10px;
      font-size: 0.8rem;
    }
  }

  @media only screen and (max-width: 425px) {
    nav {
      padding: 0 0.5rem 0 0;
    }
  }

  @media only screen and (max-width: 390px) {
    nav {
      padding: 0;
    }
    span {
      padding: 5px;
    }

    .logo-container {
      padding: 10px 0 10px 10px;
    }
  }
</style>
