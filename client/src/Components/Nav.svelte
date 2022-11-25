<script lang="ts">
  import { Link } from 'svelte-navigator';

  import logoImg from '../assets/imgs/img_logo.svg';
  import logoText from '../assets/imgs/text_logo.svg';
</script>

<nav>
  <div class="nav-logo">
    <div class="logo-container">
      <img src={logoImg} alt="adopet logo" />
      <img src={logoText} alt="adopet" class="logoText" />
    </div>
  </div>
  <div class="links">
    <a href="/" class="link">HOME</a>
    <a href="/login" class="link">LOGIN</a>
    <!--
    <Link to="/">HOME</Link>
    <Link to="/login">LOGIN</Link> -->
  </div>
</nav>

<style>
  nav {
    height: 6vh;
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
  a {
    padding: 15px;
  }
</style>
