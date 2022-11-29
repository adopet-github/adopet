<script lang="ts">
  import { Link } from 'svelte-navigator';

  import logoImg from '../assets/imgs/img_logo.svg';
  import logoText from '../assets/imgs/text_logo.svg';
  import LogOut from './Inputs/LogOut.svelte';
</script>

<nav>
  <div class="nav-logo">
    <div class="logo-container">
      <img src={logoImg} alt="adopet logo" />
      <img src={logoText} alt="adopet" class="logoText" />
    </div>
  </div>
  <div class="links">
    <Link to="/"><span>HOME</span></Link>
    <Link to="/login"><span>LOGIN</span></Link>
    <Link to="/register"><span>REGISTER</span></Link>
    <Link to="/settings"><span>SETTINGS</span></Link>
    <LogOut />
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
</style>
