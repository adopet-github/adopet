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
  let emailError: boolean;

  let password = '';
  let passwordError: boolean;

  let firstName = '';
  let firstNameError: boolean;

  let lastName = '';
  let lastNameError: boolean;

  let accountType: 'shelter' | 'adopter' = 'adopter';

  let shelterName = '';
  let shelterNameError: boolean;

  const handleRegister = () => {
    if (accountType === 'shelter' && !shelterName) {
      shelterNameError = true;
      shelterName = '';
    }

    if (accountType === 'adopter') {
      if (!firstName) {
        firstNameError = true;
        firstName = '';
      }
      if (!lastName) {
        lastNameError = true;
        lastName = '';
      }
    }

    if (!email.includes('@') || !email.includes('.')) {
      emailError = true;
      email = '';
    }
    if (!password) {
      passwordError = true;
      password = '';
    }

    if (
      !shelterNameError &&
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !passwordError
    ) {
      // is user one collection of is there a separate collection for adopter and shelter
      const userCredentials = {
        firstName,
        lastName,
        email,
        password,
        shelterName
      };
      if (accountType === 'adopter') {
        delete userCredentials.shelterName;
        // send adopter to backend
      } else {
        delete userCredentials.firstName;
        delete userCredentials.lastName;
        // send shelter to backend
      }
      console.log(userCredentials);
      navigate('/onboarding');
    }
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
          <Name
            bind:value={shelterName}
            nameType="Shelter name"
            bind:error={shelterNameError}
          />
        {:else}
          <div class="names">
            <Name
              nameType="First name"
              bind:value={firstName}
              bind:error={firstNameError}
            />
            <Name
              nameType="Last name"
              bind:value={lastName}
              bind:error={lastNameError}
            />
          </div>
        {/if}
        <Email bind:value={email} bind:error={emailError} />
        <Password bind:value={password} bind:error={passwordError} />
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
  h1 {
    padding: 0;
  }
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
    transition: 1s all;
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

  button:focus {
    outline: solid 1px rgba(30, 144, 255, 0.5);
  }

  img {
    width: 20px;
    height: 20px;
  }
</style>
