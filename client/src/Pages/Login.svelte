<script lang="ts">
  import Email from '../Components/Inputs/Email.svelte';
  import Password from '../Components/Inputs/Password.svelte';
  import GoogleIcon from '../assets/icons/google-icon.svg';
  import RouteTransition from '../Components/Transitions/RouteTransition.svelte';
  import { Link } from 'svelte-navigator';
  let email = '';
  let password = '';

  const handleLogin = () => {
    // check password in db
    const credentials = {
      email,
      password
    };
    console.log(credentials);
    email = '';
    password = '';
  };

  const handleGoogleLogin = () => {
    console.log('login with google');
  };
</script>

<RouteTransition direction="backward">
  <div class="container">
    <div class="form-container">
      <h1>Login</h1>
      <button on:click={handleGoogleLogin}>
        <img src={GoogleIcon} alt="google icon" />
        <span>Login with Google </span>
      </button>
      <div class="or">
        <hr />
        <h2>OR</h2>
        <hr />
      </div>
      <form on:submit|preventDefault={handleLogin}>
        <Email bind:value={email} />
        <Password bind:value={password} />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?
        <Link to="/register">
          <strong>Register</strong>
        </Link>
      </p>
    </div>
  </div>
</RouteTransition>

<style>
  h1 {
    padding: 0;
  }
  .container {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 92vh;
  }

  .form-container {
    color: black;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15.2px);
    -webkit-backdrop-filter: blur(15.2px);
    border: 1px solid rgba(255, 255, 255, 0.19);
    width: 500px;
    padding: 2rem 0;
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
    width: 70%;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: white;
    color: black;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15.2px);
    -webkit-backdrop-filter: blur(15.2px);
    border: 1px solid rgba(255, 255, 255, 0.19);
  }

  img {
    width: 20px;
    height: 20px;
  }
</style>
