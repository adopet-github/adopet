<script lang="ts">
  import Button from '../Components/Button.svelte';
  import BooleanRadio from '../Components/Inputs/BooleanRadio.svelte';
  import Number from '../Components/Inputs/Number.svelte';

  let user = 'adopter';

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
    user == 'adopter' ? (user = 'shelter') : (user = 'adopter');
  };
</script>

<Button
  text="change profile type"
  colour="white"
  on:click={handleProfileView}
/>

<div class="container glass">
  <p
    style="color: var(--red);
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;"
  >
    close
  </p>
  <h2>Edit profile</h2>
  <div class="profile-img" />
  <p style="color: var(--red); cursor: pointer">change image</p>
  <div class="details">
    <label for="pet-name">{user == 'adopter' ? 'Name' : 'Shelter name:'}</label>
    <input
      id="pet-name"
      label="shelter name"
      placeholder="Shelter123"
      type="text"
    />

    <label for="email">Email:</label>
    <input
      id="email"
      label="email"
      placeholder="shelter@shelter.com"
      type="email"
    />

    <label for="phone">Phone:</label>
    <input id="phone" label="phone" placeholder="123456789" type="tel" />
    {#if user == 'adopter'}
      <Number bind:value={age} label="Age:" bind:error={ageError} />
      <div class="auth-input-container">
        <label>
          House type:
          <select class="auth-input" bind:value={houseType}>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="townhouse">Townhouse</option>
            <option value="villa">Villa</option>
          </select>
        </label>
      </div>
      <div class="radio-input">
        <p>Do you have any other pets?</p>
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
    {:else}
      <p>shelter fields here</p>
    {/if}
    <span><Button text="save" /></span>
  </div>
</div>

<style>
  .container {
    height: fit-content;
    position: relative;
    width: 50%;
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
    width: 40%;
  }

  .profile-img {
    min-height: 10rem;
    min-width: 10rem;
    background-color: var(--grey);
    border-radius: 100px;
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
    margin: 0.5rem 0;
    width: 100%;
    font-size: 1rem;
  }

  label {
    font-size: 1rem;
    width: 100%;
  }

  #email,
  #phone {
    width: 100%;
  }

  span {
    width: 100%;
    margin-top: 1rem;
  }
</style>
