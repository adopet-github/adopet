<script lang="ts">
  import Button from './Button.svelte';
  import { dashView } from '../Stores/dashView';
  import type { ShelterAnimal } from '../types/shelterAnimal';
  import { selectedAnimal } from '../Stores/selectedAnimal';
  import { deleteAnimal } from '../Services/animal';
  import { userCredentials } from '../Stores/userCredentials';

  export let animal: ShelterAnimal;

  console.log('list item amnimal', animal);

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
  <div class="img-container">
    <div class="dummy-img" />
  </div>
  <p>{animal.name}</p>
  <p>{animal.id}</p>
  <p>enquiries</p>
  <div class="btns-container">
    <span
      ><Button
        text="view"
        on:click={() => {
          $dashView = 'oneAnimal';
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

  .dummy-img {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    background-color: var(--grey);
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
</style>
