<script lang="ts">
  // COMPONENTS
  import CloseButton from './CloseButton.svelte';
  import Button from './Button.svelte';
  import ImagesList from './Images/ImagesList.svelte';
  import ImageInput from './Inputs/ImageInput.svelte';

  // UTILS
  import { selectedAnimal } from '../Stores/selectedAnimal';
  import { toast, SvelteToast } from '@zerodevx/svelte-toast';
  import { cloudinaryUpload } from '../Services/Cloudinary';
  import { addAnimalImage } from '../Services/animal';
  import { deleteImage } from '../Services/image';

  let { name, description, age, weight } = $selectedAnimal;

  let showAddImage = false;
  let isLoadingResponse = false;

  let fileInput;

  let editMode = false;
</script>

<div class="card glass glass1">
  <CloseButton />
  <div class="heading-cont">
    <h1>{name}</h1>
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
    <ImagesList images={$selectedAnimal.images} />
  </div>
  <div class="stat-cont">
    <div class="description">
      <p>{description}</p>
    </div>
    <div class="stats">
      <div class="age-cont"><p>🎂 <span>{age}</span> years old</p></div>
      <div class="weight-cont"><p>⚖️ <span>{weight}</span> kg</p></div>
    </div>
  </div>
  <div class="enquiries">
    <h2>Current enquiries</h2>
    <p>List of people here</p>
  </div>
</div>
<SvelteToast />

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
    overflow-x: auto;
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
</style>
