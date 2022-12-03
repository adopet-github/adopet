<script lang="ts">
  // COMPONENTS
  import Button from './Button.svelte';
  import ImagesList from './Images/ImagesList.svelte';

  // UTILS
  import { selectedAnimal } from '../Stores/selectedAnimal';
  import { updateAnimal } from '../Services/animal';
  import { userCredentials } from '../Stores/userCredentials';

  export let editMode: boolean;

  const handleAnimalProfileUpdate = async () => {
    editMode ? (editMode = false) : (editMode = true);
    const res = await updateAnimal({ ...$selectedAnimal });
    console.log(res);
    userCredentials.update((prev) => ({
      ...prev,
      animals: prev.animals.map((animal) => {
        if (animal.id === $selectedAnimal.id) {
          return { ...$selectedAnimal, id: animal.id };
        } else {
          return animal;
        }
      })
    }));
  };
</script>

<div class="card glass glass1">
  <div class="heading-cont">
    <input bind:value={$selectedAnimal.name} class="name" />
    <span><Button text={'save'} on:click={handleAnimalProfileUpdate} /></span>
  </div>
  <div class="imgs-cont">
    <ImagesList images={$selectedAnimal.images} />
  </div>
  <div class="stat-cont">
    <div class="description">
      <input bind:value={$selectedAnimal.description} />
    </div>
    <div class="stats">
      <div class="age-cont">
        <p>
          🎂 <span
            ><input bind:value={$selectedAnimal.age} class="number" /></span
          > years old
        </p>
      </div>
      <div class="weight-cont">
        <p>
          ⚖️ <span
            ><input bind:value={$selectedAnimal.weight} class="number" /></span
          > kg
        </p>
      </div>
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
    overflow: hidden;
  }

  .heading-cont {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .imgs-cont {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    width: 80%;
  }

  .stat-cont {
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: space-around;
    color: var(--lavender);
  }

  .stats span {
    color: var(--red);
    font-weight: 900;
  }
  .description {
    width: 50%;
  }

  input {
    width: 100%;
    background: none;
    font-family: 'Satoshi Variable';
    border: 1px dashed var(--red);
    border-radius: 20px;
    background-color: white;
    padding: 0.5rem;
  }

  input.number {
    width: 20%;
    margin-bottom: 1rem;
  }
</style>
