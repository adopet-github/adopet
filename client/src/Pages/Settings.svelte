<script lang="ts">
  import Button from '../Components/Button.svelte';
  import BooleanRadio from '../Components/Inputs/BooleanRadio.svelte';
  import Email from '../Components/Inputs/Email.svelte';
  import Name from '../Components/Inputs/Name.svelte';
  import Number from '../Components/Inputs/Number.svelte';
  import CloseButton from './CloseButton.svelte';
  import AddressAutocomplete from '../Components/Inputs/AddressAutocomplete.svelte';

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

<div class="container">
  <div class="card glass glass1">
    <span class="profile-btn"
      ><Button
        text="change profile type"
        colour="white"
        on:click={handleProfileView}
      /></span
    >
    <CloseButton />
    <div class="content-left">
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
        <label for="address">Address: </label>
        <AddressAutocomplete />
        {#if accountType === 'shelter'}
          <span><Button text="save" /></span>
        {/if}
      </div>
    </div>

    {#if accountType == 'adopter'}
      <div class="content-right">
        <div class="details">
          <label for="description">Description:</label>
          <textarea id="description" name="description" rows="3" />
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
            <BooleanRadio
              bind:value={hasChildren}
              bind:error={hasChildrenError}
            />
          </div>
          <span><Button text="save" /></span>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .container {
    height: 92vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .card {
    height: fit-content;
    position: relative;
    width: 1000px;
    border-radius: 20px;
    padding: 1rem;
    padding-bottom: 2.5rem;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    color: var(--black);
    gap: 1rem;
  }

  .content-left,
  .content-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
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

  select {
    padding: 1rem;
  }

  span {
    width: 100%;
    margin-top: 1rem;
  }

  .profile-btn {
    position: fixed;
    top: 0;
    left: 1rem;
    width: 10%;
  }
</style>
