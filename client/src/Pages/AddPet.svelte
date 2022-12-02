<script lang="ts">
  import Button from '../Components/Button.svelte';
  import Name from '../Components/Inputs/Name.svelte';
  import Number from '../Components/Inputs/Number.svelte';
  import CloseButton from '../Components/CloseButton.svelte';
  import { createAnimal } from '../Services/animal';
  import { userCredentials } from '../Stores/userCredentials';
  import ImagesList from '../Components/Images/ImagesList.svelte';
  import { selectedAnimal } from '../Stores/selectedAnimal';
  import { dashView } from '../Stores/dashView';

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
    userCredentials.update((previous) => {
      const newAnimal = {
        ...res.data.animal,
        description: res.data.description,
        images: [],
        adopters: []
      };
      const newAnimals = [...previous.animals, newAnimal];
      return {
        ...previous,
        animals: newAnimals
      };
    });
    console.log(pet);
    // const profile = await getProfile();
    // userCredentials.set(profile);
    console.log(res);
    dashView.set(['likes', 'allAnimals']);
  };
</script>

<div class="card glass glass1">
  <CloseButton closeTo={'animalList'} />
  <h2>Add Pet</h2>
  <div class="imgs-cont">
    <ImagesList images={$selectedAnimal.images} />
  </div>
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
  .card {
    height: 100%;
    position: relative;
    width: 100%;
    border-radius: 20px;
    padding: 1rem;
    padding-bottom: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: var(--black);
    gap: 1rem;
    overflow: hidden;
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
