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

  const handleImageUpload = async () => {
    if (!fileInput.files[0]) {
      toast.push('Please choose an image to upload', {
        theme: {
          '--toastColor': 'mintcream',
          '--toastBackground': '#d33e43',
          '--toastBarBackground': 'mintcream'
        }
      });
      return;
    }
    isLoadingResponse = true;
    const res = await cloudinaryUpload(fileInput.files[0]);
    const url = res.secure_url;

    const image = {
      caption: 'no cap',
      url: url
    };
    const serverRes = await addAnimalImage(image, $selectedAnimal.id);
    console.log(serverRes);
    selectedAnimal.update((prev) => ({
      ...prev,
      images: [...prev.images, { ...image, id: serverRes.data.id }]
    }));
    showAddImage = false;
    isLoadingResponse = false;
  };

  let imageIdToDelete;
  let showDeleteImage = false;
  const handleDeleteImageOpen = (e) => {
    showDeleteImage = true;
    imageIdToDelete = e.detail.id;
  };

  const handleImageDelete = async () => {
    const res = await deleteImage(imageIdToDelete);
    console.log(res);
    selectedAnimal.update((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image.id !== imageIdToDelete)
    }));
    showDeleteImage = false;
  };
</script>

{#if showAddImage}
  <div class="add-image-container glass">
    <div class="add-image">
      <ImageInput bind:fileInput />
      <div class="buttons">
        <button class="cancel-add" on:click={() => (showAddImage = false)}>
          CANCEL
        </button>
        <button class="add-img-btn" on:click={handleImageUpload}>
          {isLoadingResponse ? 'UPLOADING...' : 'ADD'}
        </button>
      </div>
    </div>
  </div>
{:else if showDeleteImage}
  <div class="delete-image-container glass">
    <div class="delete-image">
      <p>Are you sure you want to delete this image?</p>
      <div class="buttons">
        <button class="cancel-add" on:click={() => (showDeleteImage = false)}>
          CANCEL
        </button>
        <button class="add-img-btn" on:click={handleImageDelete}>
          {isLoadingResponse ? 'DELETING...' : 'DELETE'}
        </button>
      </div>
    </div>
  </div>
{/if}
<div class="card glass glass1">
  <CloseButton />
  <div class="heading-cont">
    <h1>{name}</h1>
    <span><Button text={'edit'} /></span>
  </div>
  <div class="imgs-cont">
    <ImagesList
      images={$selectedAnimal.images}
      on:openAddImage={() => (showAddImage = true)}
      on:deleteImage={handleDeleteImageOpen}
    />
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

  .add-image-container,
  .delete-image-container {
    display: grid;
    place-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    height: 100vh;
    width: 100vw;
  }

  .add-image,
  .delete-image {
    display: flex;
    flex-direction: column;
    margin: auto;
    border-radius: 20px;
    font-size: 2rem;
    gap: 1rem;
  }

  .buttons {
    display: flex;
    gap: 2rem;
    justify-content: space-evenly;
  }

  button {
    outline: none;
    background-color: transparent;
    width: 30%;
  }

  .add-img-btn {
    background-color: var(--red);
    color: white;
    padding: 1rem 0;
    border-radius: 1rem;
    font-weight: bold;
  }
</style>
