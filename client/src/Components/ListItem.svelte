<script lang="ts">
  import Button from './Button.svelte';
  import { dashView } from '../Stores/dashView';
  import type { ShelterAnimal } from '../types/shelterAnimal';
  import { selectedAnimal } from '../Stores/selectedAnimal';
  import { deleteAnimal } from '../Services/animal';
  import { navigate } from 'svelte-navigator';

  export let animal: ShelterAnimal;

  const handleAnimalDelete = async () => {
    const res = await deleteAnimal(animal.id);
    console.log(res);
    navigate('/shelter/dashboard');
  };
</script>

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
          console.log(animal);
          $selectedAnimal = animal;
        }}
      /></span
    >
    <span><Button text="X" on:click={handleAnimalDelete} /></span>
  </div>
</div>

<style>
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
</style>
