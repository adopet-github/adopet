<script lang="ts">
  import Button from '../Components/Button.svelte';
  import Name from '../Components/Inputs/Name.svelte';
  import Number from '../Components/Inputs/Number.svelte';
  import CloseButton from '../Components/CloseButton.svelte';
  import { addAnimalImage, createAnimal } from '../Services/animal';
  import { userCredentials } from '../Stores/userCredentials';
  import ImagesList from '../Components/Images/ImagesList.svelte';
  import { selectedAnimal } from '../Stores/selectedAnimal';
  import { dashView } from '../Stores/dashView';

  $selectedAnimal.id = '';

  let petName: string;
  let petWeight: number;
  let petAge: number;
  let petDescription: string;
  let images = [];

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
    console.log(images);
    const imagesRes = await addAnimalImage(images, res.data.animal.id);
    console.log('res', imagesRes);
    userCredentials.update((previous) => {
      const newAnimal = {
        ...res.data.animal,
        description: res.data.description,
        images,
        adopters: []
      };
      const newAnimals = [...previous.animals, newAnimal];
      return {
        ...previous,
        animals: newAnimals
      };
    });
    dashView.set(['likes', 'animalList']);
  };
</script>

<div class="card glass glass1">
  <CloseButton closeTo={'animalList'} />
  <h2>Add Pet</h2>
  <div class="imgs-cont">
    <ImagesList bind:images />
  </div>
  <div class="details">
    <div class="details-left">
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
    </div>
    <div class="details-right">
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
  }

  .imgs-cont {
    width: 80%;
  }

  .details {
    width: 80%;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .details-left {
    width: 50%;
  }

  .details-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
  }

  .ageWeightCont {
    display: flex;
    flex-direction: column;
    width: 100%;
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

  @media only screen and (max-width: 688px) {
    .card {
      border-radius: 0px;
    }

    .details {
      flex-direction: column;
    }
    .details-left,
    .details-right {
      width: 100%;
    }
  }
</style>
