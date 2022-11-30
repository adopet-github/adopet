<script lang="ts">
  import Button from '../Components/Button.svelte';
  import Name from '../Components/Inputs/Name.svelte';
  import Number from '../Components/Inputs/Number.svelte';
  import CloseButton from '../Components/CloseButton.svelte';
  import { createAnimal } from '../Services/animal';
  import { userCredentials } from '../Stores/userCredentials';
  import { navigate } from 'svelte-navigator';

  console.log($userCredentials);

  let petName: string;
  let petWeight: number;
  let petAge: number;
  let petDescription: string;

  const handleAddAnimal = async () => {
    const pet = {
      shelterId: $userCredentials.id,
      description: petDescription,
      name: petName,
      age: petAge,
      weight: petWeight
    };
    const res = await createAnimal(pet);
    console.log(res);
    navigate('/shelter/dashboard');
  };
</script>

<div class="container glass glass1">
  <CloseButton />
  <h2>Add Pet</h2>
  <div class="profile-img" />
  <p style="color: var(--red); cursor: pointer">upload images</p>
  <div class="details">
    <label for="pet-name">Pet name:</label>
    <Name nameType="Pet name" bind:value={petName} />
    <div class="ageWeightCont">
      <div>
        <Number bind:value={petWeight} label="Weight (kg): " />
      </div>
      <div>
        <Number bind:value={petAge} label="Age of pet: " />
      </div>
    </div>
    <label for="description">Description:</label>
    <textarea
      id="description"
      name="description"
      rows="3"
      bind:value={petDescription}
    />
    <span><Button text="add pet" on:click={handleAddAnimal} /></span>
  </div>
</div>

<style>
  .container {
    height: fit-content;
    position: relative;
    width: 500px;
    border-radius: 20px;
    margin: auto;
    margin-top: 4rem;
    padding: 1rem 1rem 4rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--black);
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 70%;
    gap: 0.5rem;
  }

  .ageWeightCont {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1rem;
  }

  .profile-img {
    min-height: 10rem;
    min-width: 10rem;
    max-height: 10rem;
    max-width: 10rem;
    background-color: var(--grey);
    border-radius: 100px;
  }

  h2 {
    color: var(--red);
    font-size: 2rem;
    padding: 0.5rem;
    font-weight: 900;
  }

  label {
    width: 100%;
  }

  span {
    width: 100%;
    margin-top: 2rem;
  }
</style>
