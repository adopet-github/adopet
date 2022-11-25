<script lang="ts">
  import EmailInput from '../Components/Inputs/EmailInput.svelte';
  import PasswordInput from '../Components/Inputs/PasswordInput.svelte';
  import GoogleIcon from '../assets/google-icon.svg';

  let email = '';
  let password = '';

  const handleLogIn = () => {
    // check password in db
    console.log('email:', email);
    console.log('password:', password);
    email = '';
    password = '';
  };

  const handleGoogleLogin = () => {
    console.log('login with google');
  };
</script>

<div class="container">
  <div class="login-container">
    <h1>LOGIN</h1>
    <button on:click={handleGoogleLogin}>
      <img src={GoogleIcon} alt="google icon" />
      <span> Login with Google </span>
    </button>
    <div class="or">
      <hr />
      <h2>OR</h2>
      <hr />
    </div>
    <form on:submit|preventDefault={handleLogIn}>
      <EmailInput bind:value={email} />
      <PasswordInput confirmation={false} bind:value={password} />
      <button type="submit">Login</button>
    </form>
  </div>
</div>

<style>
  .container {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .login-container {
    background-color: black;
    width: 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    border-radius: 1rem;
  }

  .or {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    gap: 15px;
  }

  hr {
    width: 33%;
    opacity: 0.2;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 100%;
  }

  button {
    width: 50%;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: white;
    color: black;
  }

  img {
    width: 20px;
    height: 20px;
  }
</style>
