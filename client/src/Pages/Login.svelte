<script lang="ts">
  // COMPONENTS
  import Email from '../Components/Inputs/Email.svelte';
  import Password from '../Components/Inputs/Password.svelte';
  import Button from '../Components/Button.svelte';
  import GoogleIcon from '../assets/icons/google-icon.svg';

  // ANIMATION
  import RouteTransition from '../Components/Transitions/RouteTransition.svelte';
  import DogLoader from '../Components/Loaders/DogLoader.svelte';
  import TypingLoader from '../Components/Loaders/TypingLoader.svelte';

  // UTILS
  import { Link, useNavigate } from 'svelte-navigator';
  import { getProfile, logIn } from '../Services/auth';
  import { userCredentials } from '../Stores/userCredentials';

  let isLoading = false;
  let email = '';
  let password = '';
  let error = '';

  const navigate = useNavigate();

  const handleLogin = async () => {
    const credentials = {
      email,
      password
    };
    const res = await logIn(credentials);
    if (res.status === 200) {
      isLoading = true;
      error = '';
      localStorage.setItem('jwt', res.token);
      // get profile
      const profileRes = await getProfile();
      if (profileRes.status === 401) {
        navigate('/');
      } else if (profileRes.status === 200) {
        userCredentials.set(profileRes.data);
        setTimeout(() => {
          if (profileRes.data.house_type) {
            navigate('/user/swipe');
          } else {
            navigate('/shelter/dashboard');
          }
        }, 2000);
      }
    } else if (res.status === 400) {
      error = 'Email or password incorrect';
    }
    email = '';
    password = '';
  };

  const handleGoogleLogin = () => {
    console.log('login with google');
  };
</script>

{#if isLoading}
  <DogLoader>
    <TypingLoader>Logging in...</TypingLoader>
  </DogLoader>
{:else}
  <RouteTransition direction="backward">
    <div class="container">
      <div class="form-container glass">
        <h1>Login</h1>
        <button id="google" on:click={handleGoogleLogin}>
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
          {#if error}
            <p class="error-message">{error}</p>
          {/if}
          <button id="normal-register-btn" type="submit"
            ><Button text="Login" /></button
          >
        </form>
        <p>
          Don't have an account?
          <Link to="/register">
            <span><strong>Register</strong></span>
          </Link>
        </p>
      </div>
    </div>
  </RouteTransition>
{/if}

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
    overflow: hidden;
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
    width: 70%;
  }

  button#google {
    width: 70%;
    padding: 0.75rem 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: white;
    color: black;
    font-weight: bold;
    font-size: 1;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15.2px);
    -webkit-backdrop-filter: blur(15.2px);
    border: 1px solid rgba(255, 255, 255, 0.19);
  }

  button#normal-register-btn {
    border-style: none;
    background-color: rgba(255, 255, 255, 0);
    width: 100%;
  }

  button#google:focus {
    outline: solid 1px rgba(30, 144, 255, 0.5);
  }

  img {
    width: 20px;
    height: 20px;
  }

  span:hover {
    color: var(--red);
  }

  .error-message {
    color: var(--red);
  }
</style>
