<script lang="ts">
  // COMPONENTS
  import CloseButton from './CloseButton.svelte';
  import Button from './Button.svelte';

  // UTILS
  import { selectedAnimal } from '../Stores/selectedAnimal';
  import { toast, SvelteToast } from '@zerodevx/svelte-toast';
  import AnimalProfileEdit from './AnimalProfileEdit.svelte';

  let editMode = false;
  console.log($selectedAnimal.images);
</script>

{#if editMode}
  <AnimalProfileEdit bind:editMode />
{:else}
  <div class="card glass glass1">
    <CloseButton closeTo={'animalList'} />
    <div class="heading-cont">
      <h1>{$selectedAnimal.name}</h1>
      <span
        ><Button
          text={'edit'}
          on:click={() => {
            editMode ? (editMode = false) : (editMode = true),
              console.log(editMode);
          }}
        /></span
      >
    </div>
    <div class="imgs-cont">
      {#if $selectedAnimal.images}
        {#each $selectedAnimal.images as image}
          <div class="img"><img src={image.url} alt="" /></div>
        {/each}
      {/if}
    </div>
    <div class="stat-cont">
      <div class="description">
        <p>{$selectedAnimal.description}</p>
      </div>
      <div class="stats">
        <div class="age-cont">
          <p>🎂 <span>{$selectedAnimal.age}</span> years old</p>
        </div>
        <div class="weight-cont">
          <p>⚖️ <span>{$selectedAnimal.weight}</span> kg</p>
        </div>
      </div>
    </div>
    <div class="enquiries">
      <h2>Current enquiries</h2>
      <p>List of people here</p>
    </div>
  </div>
  <SvelteToast />
{/if}

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
    max-width: 80%;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
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

  .img {
    /* flex: 1; */
    border-radius: 1rem;
  }

  h1,
  h2,
  p {
    color: var(--lavender);
  }

  img {
    max-height: 10rem;
    max-width: 100%;
    object-fit: cover;
    border-radius: inherit;
    aspect-ratio: 1;
  }

  @media only screen and (max-width: 1280px) {
    .imgs-cont {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }

    img {
      max-height: 9rem;
    }
  }
</style>
