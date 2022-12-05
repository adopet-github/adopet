<script lang="ts">
  import Email from '../Components/Inputs/Email.svelte';
  import Password from '../Components/Inputs/Password.svelte';
  import GoogleIcon from '../assets/icons/google-icon.svg';
  import Name from '../Components/Inputs/Name.svelte';
  import RouteTransition from '../Components/Transitions/RouteTransition.svelte';
  import AdopterInfo from '../Components/InfoBox/AdopterInfo.svelte';
  import ShelterInfo from '../Components/InfoBox/ShelterInfo.svelte';
  import { Link, useNavigate } from 'svelte-navigator';
  import { userCredentials } from '../Stores/userCredentials';
  import Button from '../Components/Button.svelte';
  // @ts-ignore
  import AddressAutocomplete from '../Components/Inputs/AddressAutocomplete.svelte';
  import TextArea from '../Components/Inputs/TextArea.svelte';
  import { createShelter } from '../Services/shelter';
  import type { CreateShelter } from '../types/shelter';
  import DogLoader from '../Components/Loaders/DogLoader.svelte';
  import TypingLoader from '../Components/Loaders/TypingLoader.svelte';
  import { verifyRegisterCredentials } from '../Services/auth';
  // @ts-ignore
  import GoogleAuth from '../Components/Inputs/GoogleAuth.svelte';

  const navigate = useNavigate();

  let isLoading = false;
  let error = '';

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

  let address = '';
  let location = '';
  let addressError: boolean;

  let description = '';
  let descriptionError: boolean;

  const handleRegister = async () => {
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

    if (!address || !location) {
      addressError = true;
      address = '';
    }

    if (accountType === 'shelter' && !description) {
      descriptionError = true;
    }

    if (
      !shelterNameError &&
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !passwordError &&
      !addressError &&
      !descriptionError
    ) {
      // is user one collection of is there a separate collection for adopter and shelter
      const newUserCredentials = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        name: shelterName,
        address: address,
        latitude: location[0],
        longitude: location[1],
        description: description
      };

      if (accountType === 'adopter') {
        const isVerified = await verifyRegisterCredentials({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        });

        console.log(isVerified);

        if (isVerified.status !== 200) {
          error = isVerified.message;
          return;
        }
        delete newUserCredentials.name;
        delete newUserCredentials.description;
        userCredentials.set(newUserCredentials);
        navigate('/onboarding');
      } else {
        delete newUserCredentials.first_name;
        delete newUserCredentials.last_name;

        isLoading = true;
        const res = await createShelter(
          newUserCredentials as unknown as CreateShelter
        );
        if (res.status === 201) {
          // CHANGE TO HTTP ONLY COOKIE FROM SERVER
          userCredentials.set({
            ...newUserCredentials,
            id: res.data,
            animals: []
          });
          localStorage.setItem('jwt', res.token);
          setTimeout(() => {
            navigate('/shelter/dashboard');
          }, 2000);
        } else if (res.status === 400) {
          if (res.message.includes('User with email')) emailError = true;
          if (
            res.message[0] ===
            'Password must have at least eight characters, at least one uppercase letter, one lowercase letter and one number'
          )
            passwordError = true;
          alert(res.message);
        }
      }
    }
  };

  const handleGoogleRegister = () => {
    console.log('register with google');
  };
</script>

{#if isLoading}
  <DogLoader>
    <TypingLoader>Creating your account...</TypingLoader>
  </DogLoader>
{:else}
  <RouteTransition direction="forward">
    <div class="container">
      <!-- {#if accountType === 'adopter'}
      <AdopterInfo />
    {:else}
      <ShelterInfo />
    {/if} -->
      <div class="form-container glass">
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
          <button id="google" on:click={handleGoogleRegister}>
            <img src={GoogleIcon} alt="google icon" />
            <span>Register with Google </span>
          </button>
          <GoogleAuth />
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
          <AddressAutocomplete
            bind:value={address}
            bind:location
            bind:error={addressError}
          />
          {#if accountType === 'shelter'}
            <TextArea bind:value={description} bind:error={descriptionError} />
          {/if}
          {#if error}
            <p class="error-message">{error}</p>
          {/if}
          <button type="submit" id="normal-register-btn"
            ><Button text="Register" /></button
          >
        </form>
        <p>
          Already have an account?
          <Link to="/login">
            <span><strong>Login Now</strong></span>
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
    gap: 4rem;
  }

  .form-container {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15.2px);
    -webkit-backdrop-filter: blur(15.2px);
    border: 1px solid rgba(255, 255, 255, 0.19);
    color: var(--black);
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
    accent-color: var(--black);
  }

  .names {
    display: flex;
    gap: 15px;
    width: 100%;
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
