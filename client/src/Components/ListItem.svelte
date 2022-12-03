<script lang="ts">
  import Button from './Button.svelte';
  import { dashView } from '../Stores/dashView';
  import type { ShelterAnimal } from '../types/shelterAnimal';
  import { selectedAnimal } from '../Stores/selectedAnimal';
  import { deleteAnimal } from '../Services/animal';
  import { userCredentials } from '../Stores/userCredentials';
  import { Background } from '@cloudinary/url-gen/qualifiers';
  import ProfilePic from './ProfilePic.svelte';

  export let animal: ShelterAnimal;

  let showDeleteWarning = false;

  const prewarnDelete = () => {
    showDeleteWarning = true;
  };

  const handleAnimalDelete = async () => {
    userCredentials.update((previous) => {
      const newAnimals = previous.animals.filter((animalDB) => {
        return animalDB.id != animal.id;
      });
      return {
        ...previous,
        animals: newAnimals
      };
    });
    const res = await deleteAnimal(animal.id);
    console.log(res);
    showDeleteWarning = false;
  };
</script>

{#if showDeleteWarning}
  <div class="warning-container glass">
    <div class="warning">
      <p>Are you sure you want to delete {animal.name}?</p>
      <p class="smallprint">This action cannot be undone</p>
      <Button
        text="Yes, I'm sure"
        colour="white"
        on:click={handleAnimalDelete}
      />
      <Button
        text="No, take me back"
        on:click={() => {
          showDeleteWarning = false;
        }}
      />
    </div>
  </div>
{/if}
<div class="list-item glass">
  <ProfilePic img={animal.images[0] ? animal.images[0].url : ''} />
  <div class="name-id-cont">
    <p class="animal-name">{animal.name}</p>
    <p class="animal-id">{animal.id}</p>
  </div>
  <p>enquiries</p>
  <div class="btns-container">
    <span
      ><Button
        text="view"
        on:click={() => {
          $dashView[1] = 'animal';
          console.log('animal', animal);
          selectedAnimal.set(animal);
        }}
      /></span
    >
    <span><Button text="X" on:click={prewarnDelete} /></span>
  </div>
</div>

<style>
  .warning-container {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    height: 100vh;
    width: 100vw;
  }

  .warning {
    display: flex;
    flex-direction: column;

    padding: 10rem;
    margin: auto;
    border-radius: 20px;
    font-size: 2rem;
    display: flex;
    gap: 1rem;
  }

  .list-item {
    width: 100%;
    padding: 1rem 3rem;
    margin-bottom: 1rem;
    border-radius: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btns-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btns-container > span {
    margin-left: 10px;
  }

  .smallprint {
    font-size: 1rem;
    text-align: center;
    color: var(--red);
    font-weight: 900;
  }

  .name-id-cont {
    position: relative;
    width: 20%;
  }

  .animal-name {
    font-weight: 800;
    text-transform: capitalize;
    font-size: 1.4rem;
  }

  .animal-id {
    font-size: 0.5rem;
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    opacity: 0.2;
  }
</style>
