<script lang="ts">
  import { useNavigate } from 'svelte-navigator';
  import BooleanRadio from '../Components/Inputs/BooleanRadio.svelte';
  import Number from '../Components/Inputs/Number.svelte';
  import MovingBackground from '../Components/MovingBackground.svelte';
  import { onDestroy } from 'svelte';
  import DogLoader from '../Components/Loaders/DogLoader.svelte';
  import TypingLoader from '../Components/Loaders/TypingLoader.svelte';
  import { userCredentials } from '../Stores/userCredentials';

  const navigate = useNavigate();
  console.log($userCredentials);

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

  const handleOnboarding = () => {
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

    if (!ageError && !hasPetsError && !hasChildrenError && !timeAtHomeError) {
      // send to backend
      const onboardingCredentials = {
        age,
        houseType,
        hasPets,
        hasChildren,
        timeAtHome
      };
      userCredentials.update((prev) => ({ ...prev, ...onboardingCredentials }));
      console.log($userCredentials);
      navigate('/user/swipe');
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
      <h1>Tell us more about yourself</h1>
      <Number bind:value={age} label="How old are you?" bind:error={ageError} />
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
      <div class="radio-input">
        <p>Do you have any pets?</p>
        <BooleanRadio bind:value={hasPets} bind:error={hasPetsError} />
      </div>
      <div class="radio-input">
        <p>Do you have any children?</p>
        <BooleanRadio bind:value={hasChildren} bind:error={hasChildrenError} />
      </div>
      <Number
        bind:value={timeAtHome}
        label="Average hours at home daily:"
        bind:error={timeAtHomeError}
      />
      <button on:click={handleOnboarding}>
        <i class="mi mi-arrow-right" />
        Continue
      </button>
    </div>
  {/if}
</MovingBackground>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: black;
    padding: 2rem;
    border-radius: 1rem;
  }

  .radio-input {
    width: 70%;
  }

  select {
    padding: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  i {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
