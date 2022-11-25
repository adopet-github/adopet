<script lang="ts">
  import Email from '../Components/Inputs/Email.svelte';
  import Password from '../Components/Inputs/Password.svelte';
  import GoogleIcon from '../assets/icons/google-icon.svg';
  import Name from '../Components/Inputs/Name.svelte';
  import RouteTransition from '../Components/Transitions/RouteTransition.svelte';
  import AdopterInfo from '../Components/InfoBox/AdopterInfo.svelte';
  import ShelterInfo from '../Components/InfoBox/ShelterInfo.svelte';
  import { Link, useNavigate } from 'svelte-navigator';

  const navigate = useNavigate();

  let email = '';
  let password = '';
  let confirmPassword = '';
  let firstName = '';
  let lastName = '';
  let accountType: 'shelter' | 'adopter' = 'adopter';
  let shelterName = '';

  const handleRegister = () => {
    console.log('accountType', accountType);
    console.log('shelter name', shelterName);
    console.log('first name:', firstName);
    console.log('last name:', lastName);
    console.log('email:', email);
    console.log('password:', password);
    console.log('confirm password:', confirmPassword);

    if (password !== confirmPassword) {
      // error alert
      console.log('passwords do not match');
    } else {
      // go to register flow
      navigate('/onboarding');
    }

    firstName = '';
    lastName = '';
    email = '';
    password = '';
    confirmPassword = '';
  };

  const handleGoogleRegister = () => {
    console.log('register with google');
  };
</script>

<RouteTransition direction="forward">
  <div class="container">
    <!-- {#if accountType === 'adopter'}
      <AdopterInfo />
    {:else}
      <ShelterInfo />
    {/if} -->
    <div class="form-container">
      <h1>Sign up</h1>
      <div class="account-type">
        <label>
          <input type="radio" bind:group={accountType} value="adopter" />
          I want to adopt
        </label>
        <label>
          <input type="radio" bind:group={accountType} value="shelter" />
          We are a shelter
        </label>
      </div>
      {#if accountType === 'adopter'}
        <button on:click={handleGoogleRegister}>
          <img src={GoogleIcon} alt="google icon" />
          <span>Register with Google </span>
        </button>
        <div class="or">
          <hr />
          <h2>OR</h2>
          <hr />
        </div>
      {/if}
      <form on:submit|preventDefault={handleRegister}>
        {#if accountType === 'shelter'}
          <Name bind:value={shelterName} nameType="Shelter name" />
        {/if}
        <div class="names">
          <Name nameType="First name" bind:value={firstName} />
          <Name nameType="Last name" bind:value={lastName} />
        </div>
        <Email bind:value={email} />
        <Password confirmation={false} bind:value={password} />
        <Password confirmation={true} bind:value={confirmPassword} />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?
        <Link to="/login">
          <strong>Login Now</strong>
        </Link>
      </p>
    </div>
  </div>
</RouteTransition>

<style>
  .container {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 92vh;
    gap: 4rem;
  }

  .form-container {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15.2px);
    -webkit-backdrop-filter: blur(15.2px);
    border: 1px solid rgba(255, 255, 255, 0.19);
    color: black;
    width: 500px;
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    border-radius: 1rem;
  }

  .account-type {
    display: flex;
    justify-content: center;
    gap: 1rem;
    width: 70%;
    accent-color: black;
  }

  label {
    display: grid;
    grid-template-columns: 1em auto;
    gap: 0.5em;
    border: 1px solid #374151;
    width: 50%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15.2px);
    -webkit-backdrop-filter: blur(15.2px);
    border: 1px solid rgba(255, 255, 255, 0.19);
    cursor: pointer;
  }

  label:hover {
    background-color: #ededed;
  }

  .names {
    display: flex;
    gap: 15px;
    width: 70%;
  }

  .or {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
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
    font-weight: bold;
    font-size: 1;
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
