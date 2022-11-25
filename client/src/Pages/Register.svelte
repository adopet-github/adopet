<script lang="ts">
  import Email from '../Components/Inputs/Email.svelte';
  import Password from '../Components/Inputs/Password.svelte';
  import GoogleIcon from '../assets/icons/google-icon.svg';
  import Name from '../Components/Inputs/Name.svelte';
  import TransitionContainer from '../Components/Transitions/TransitionContainer.svelte';
  import RouteTransition from '../Components/Transitions/RouteTransition.svelte';

  let email = '';
  let password = '';
  let confirmPassword = '';
  let firstName = '';
  let lastName = '';

  const handleRegister = () => {
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
      console.log('registered');
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
    <div class="form-container">
      <h1>REGISTER</h1>
      <button on:click={handleGoogleRegister}>
        <img src={GoogleIcon} alt="google icon" />
        <span>Register with Google </span>
      </button>
      <div class="or">
        <hr />
        <h2>OR</h2>
        <hr />
      </div>
      <form on:submit|preventDefault={handleRegister}>
        <div class="names">
          <Name nameType="First name" bind:value={firstName} />
          <Name nameType="Last name" bind:value={lastName} />
        </div>
        <Email bind:value={email} />
        <Password confirmation={false} bind:value={password} />
        <Password confirmation={true} bind:value={confirmPassword} />
        <button type="submit">Register</button>
      </form>
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
  }

  .form-container {
    background-color: black;
    width: 500px;
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    border-radius: 1rem;
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
  }

  img {
    width: 20px;
    height: 20px;
  }
</style>
