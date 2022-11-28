<script lang="ts">
  import Button from '../Components/Button.svelte';
  import BooleanRadio from '../Components/Inputs/BooleanRadio.svelte';
  import Email from '../Components/Inputs/Email.svelte';
  import Name from '../Components/Inputs/Name.svelte';
  import Number from '../Components/Inputs/Number.svelte';
  import CloseButton from './CloseButton.svelte';

  let accountType = 'adopter';

  let shelterName = '';
  let shelterNameError: boolean;

  let firstName = '';
  let firstNameError: boolean;

  let lastName = '';
  let lastNameError: boolean;

  let email = '';
  let emailError: boolean;

  let age: number;
  let ageError: boolean;

  let houseType: 'apartment' | 'house' | 'townhouse' | 'villa';

  let hasPets: boolean;
  let hasPetsError: boolean;

  let hasChildren: boolean;
  let hasChildrenError: boolean;

  let timeAtHome: number;
  let timeAtHomeError: boolean;

  const handleProfileView = () => {
    accountType == 'adopter'
      ? (accountType = 'shelter')
      : (accountType = 'adopter');
  };
</script>

<Button
  text="change profile type"
  colour="white"
  on:click={handleProfileView}
/>

<div class="container glass glass1">
  <CloseButton />
  <h2>Edit profile</h2>
  <div class="profile-img" />
  <p style="color: var(--red); cursor: pointer">change image</p>
  <div class="details">
    {#if accountType === 'shelter'}
      <label for="Name">Shelter Name:</label>
      <Name
        bind:value={shelterName}
        nameType="Shelter name"
        bind:error={shelterNameError}
      />
    {:else}
      <label for="Name">First Name:</label>
      <Name
        nameType="First name"
        bind:value={firstName}
        bind:error={firstNameError}
      />
      <label for="Name">Last Name:</label>
      <Name
        nameType="Last name"
        bind:value={lastName}
        bind:error={lastNameError}
      />
    {/if}

    <label for="email">Email:</label>
    <Email bind:value={email} bind:error={emailError} />

    <label for="phone">Phone:</label>
    <input id="phone" label="phone" placeholder="123456789" type="tel" />

    {#if accountType == 'adopter'}
      <label for="House-type"> House type: </label>
      <div class="auth-input-container">
        <select class="auth-input" bind:value={houseType}>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="townhouse">Townhouse</option>
          <option value="villa">Villa</option>
        </select>
      </div>
      <Number bind:value={age} label="Your Age:" bind:error={ageError} />
      <Number
        bind:value={timeAtHome}
        label="Average hours at home daily:"
        bind:error={timeAtHomeError}
      />
      <div class="radio-input">
        <p>Do you have any other pets?</p>
        <BooleanRadio bind:value={hasPets} bind:error={hasPetsError} />
      </div>
      <div class="radio-input">
        <p>Do you have any children?</p>
        <BooleanRadio bind:value={hasChildren} bind:error={hasChildrenError} />
      </div>
    {/if}
    <span><Button text="save" /></span>
  </div>
</div>

<style>
  .container {
    height: fit-content;
    position: relative;
    width: 500px;
    border-radius: 20px;
    margin: auto;
    margin-top: 1rem;
    padding: 1rem;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--black);
  }

  .container > div {
    margin-top: 1rem;
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 70%;
    gap: 0.5rem;
  }

  .profile-img {
    min-height: 10rem;
    min-width: 10rem;
    background-color: var(--grey);
    border-radius: 100px;
  }

  .radio-input {
    width: 100%;
  }

  h2 {
    color: var(--red);
    font-size: 2rem;
    padding: 0.5rem;
    font-weight: 900;
  }

  input {
    padding: 1rem;
    border-radius: 20px;
    width: 100%;
  }

  select {
    padding: 1rem;
  }

  span {
    width: 100%;
    margin-top: 1rem;
  }
</style>
