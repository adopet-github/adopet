<script lang="ts">
  import Button from './Button.svelte';
  import { dashView } from '../Stores/dashView';
  import type { ShelterAnimal } from '../types/shelterAnimal';
  import { selectedAnimal } from '../Stores/selectedAnimal';
  import { deleteAnimal } from '../Services/animal';
  import { userCredentials } from '../Stores/userCredentials';
  import { shelterMatches } from '../Stores/shelterMatches';
  import { animalLikes } from '../Stores/animalLikes';
  import ProfilePic from './ProfilePic.svelte';

  export let animal: ShelterAnimal;

  $: totalMatches = $shelterMatches.filter((match) => {
    return match.animal.id === animal.id;
  });
  $: totalLikes = $animalLikes.filter((match) => {
    return match.animal.id === animal.id;
  });

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
    <ProfilePic img={animal.images[0] ? animal.images[0].url : ''} />
  </div>
  <div class="name-id-cont">
    <p class="animal-name">{animal.name}</p>
    <p class="animal-id">{animal.id}</p>
  </div>
  <div class="likes-matches-cont">
    <p class="likes-matches">
      {totalLikes.length}
      {totalLikes.length !== 1 ? 'likes' : 'like'}
    </p>
    <p class="likes-matches">
      {totalMatches.length}
      {totalMatches.length !== 1 ? 'matches' : 'match'}
    </p>
  </div>
  <div class="btns-container">
    <Button
      text="view"
      on:click={() => {
        $dashView[1] = 'animal';
        console.log('animal', animal);
        selectedAnimal.set(animal);
      }}
    />
    <Button text="X" on:click={prewarnDelete} />
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

  .likes-matches-cont {
    display: flex;
    gap: 1rem;
  }

  .btns-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .smallprint {
    font-size: 1rem;
    text-align: center;
    color: var(--red);
    font-weight: 900;
  }

  .img-container {
    display: flex;
    height: 60px;
    width: 60px;
    border-radius: 25px;
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

  @media only screen and (max-width: 1280px) {
    .list-item {
      padding: 0.5rem 1.5rem;
    }
    .animal-name {
      font-size: 1.2rem;
    }
  }

  @media only screen and (max-width: 992px) {
    .btns-container {
      gap: 0.5rem;
    }
    .animal-id {
      display: none;
    }
    .likes-matches {
      font-size: 0.8rem;
    }
  }

  @media only screen and (max-width: 450px) {
    .img-container {
      height: 50px;
      width: 50px;
    }
    .animal-name {
      font-size: 1rem;
    }
    .likes-matches-cont {
      flex-direction: column;
      gap: 0.2rem;
    }
    .likes-matches {
      display: none;
    }
  }
</style>
