<script lang="ts">
  import { useNavigate } from 'svelte-navigator';
  import BooleanRadio from '../Components/Inputs/BooleanRadio.svelte';
  import Number from '../Components/Inputs/Number.svelte';
  import MovingBackground from '../Components/MovingBackground.svelte';
  import { onDestroy } from 'svelte';
  import DogLoader from '../Components/Loaders/DogLoader.svelte';
  import TypingLoader from '../Components/Loaders/TypingLoader.svelte';
  import { userCredentials } from '../Stores/userCredentials';
  import Button from '../Components/Button.svelte';
  import { createUser } from '../Services/adopter';
  import TextArea from '../Components/Inputs/TextArea.svelte';
  import type { Adopter } from '../types/adopter';

  const navigate = useNavigate();

  let isLoading = true;
  const timeoutId = setTimeout(() => (isLoading = false), 2000);

  let age: number;
  let ageError: boolean;

  let houseType: 'apartment' | 'house' | 'townhouse' | 'villa';

  let hasPets: boolean;
  let hasPetsError: boolean;

  let hasChildren: boolean;
  let hasChildrenError: boolean;

  let timeAtHome: number;
  let timeAtHomeError: boolean;

  let description: string;
  let descriptionError: boolean;

  const handleOnboarding = async () => {
    if (!age || age > 99) {
      ageError = true;
    }

    if (hasPets === undefined) {
      hasPetsError = true;
    }

    if (hasChildren === undefined) {
      hasChildrenError = true;
    }

    if (!timeAtHome || timeAtHome > 24) {
      timeAtHomeError = true;
    }

    if (!description) {
      descriptionError = true;
    }

    if (
      !ageError &&
      !hasPetsError &&
      !hasChildrenError &&
      !timeAtHomeError &&
      !descriptionError
    ) {
      // send to backend
      const onboardingCredentials = {
        age: age,
        house_type: houseType,
        has_pets: hasPets,
        has_children: hasChildren,
        time_at_home: timeAtHome,
        description: description
      };
      userCredentials.update((prev) => ({ ...prev, ...onboardingCredentials }));
      // make create adopter request
      const res = await createUser($userCredentials as Adopter);
      if (res.status === 201) {
        // CHANGE TO HTTP ONLY COOKIE FROM SERVER
        localStorage.setItem('jwt', res.token);
        navigate('/user/swipe');
      }
    }
  };

  onDestroy(() => clearTimeout(timeoutId));
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css"
  />
</svelte:head>

<MovingBackground>
  {#if isLoading}
    <DogLoader>
      <TypingLoader>Creating your account...</TypingLoader>
    </DogLoader>
  {:else}
    <div class="container">
      <div class="form-container glass">
        <div class="form">
          <h1>Tell us more about yourself</h1>
          <div class="auth-input-container">
            <label>
              What type of home do you live in?
              <select class="auth-input" bind:value={houseType}>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="townhouse">Townhouse</option>
                <option value="villa">Villa</option>
              </select>
            </label>
          </div>
          <Number
            bind:value={age}
            label="How old are you?"
            bind:error={ageError}
          />
          <Number
            bind:value={timeAtHome}
            label="Average hours at home daily:"
            bind:error={timeAtHomeError}
          />
          <div class="radio-input">
            <p>Do you have any pets?</p>
            <BooleanRadio bind:value={hasPets} bind:error={hasPetsError} />
          </div>
          <div class="radio-input">
            <p>Do you have any children?</p>
            <BooleanRadio
              bind:value={hasChildren}
              bind:error={hasChildrenError}
            />
          </div>
          <div class="description">
            <p>Add a description of yourself:</p>
            <TextArea bind:value={description} bind:error={descriptionError} />
          </div>
          <button on:click={handleOnboarding}>
            <Button text="Continue" />
          </button>
        </div>
      </div>
    </div>
  {/if}
</MovingBackground>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: var(--black);
    padding: 2rem;
    border-radius: 1rem;
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

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 70%;
  }

  .radio-input {
    width: 100%;
  }

  .description {
    width: 100%;
  }

  .description p {
    margin-bottom: 0.5rem;
  }

  select {
    padding: 0.5rem;
  }

  button {
    background-color: rgba(255, 255, 255, 0);
    width: 100%;
  }

  select {
    padding: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }

  /* i {
    display: flex;
    justify-content: center;
    align-items: center;
  } */
</style>
