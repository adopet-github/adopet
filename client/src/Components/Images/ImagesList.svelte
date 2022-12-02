<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Image from './Image.svelte';
  import { toast, SvelteToast } from '@zerodevx/svelte-toast';
  import { cloudinaryUpload } from '../../Services/Cloudinary';
  import { addAnimalImage, updateAnimal } from '../../Services/animal';
  import { deleteImage } from '../../Services/image';
  import { selectedAnimal } from '../../Stores/selectedAnimal';
  import ImageInput from '../Inputs/ImageInput.svelte';

  let showAddImage = false;
  let isLoadingResponse = false;

  let fileInput;

  // const dispatch = createEventDispatcher();

  // const handleDelete = (e) => {
  //   dispatch('deleteImage', {
  //     id: e.detail.id
  //   });
  // };
  export let button = true;
  export let images = [];

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
    if ($selectedAnimal.id) {
      const serverRes = await addAnimalImage(image, $selectedAnimal.id);
      console.log(serverRes);
      selectedAnimal.update((prev) => ({
        ...prev,
        images: [...prev.images, { ...image, id: serverRes.data.id }]
      }));
    } else {
      images = [...images, image];
      console.log(images);
    }
    showAddImage = false;
    isLoadingResponse = false;
  };

  let imageIdToDelete;
  let imageUrlToDelete;
  let showDeleteImage = false;
  const handleDeleteImageOpen = (e) => {
    showDeleteImage = true;
    imageIdToDelete = e.detail.id;
    imageUrlToDelete = e.detail.id;
  };

  const handleImageDelete = async () => {
    if (imageIdToDelete) {
      const res = await deleteImage(imageIdToDelete);
      console.log(res);
      selectedAnimal.update((prev) => ({
        ...prev,
        images: prev.images.filter((image) => image.id !== imageIdToDelete)
      }));
    } else {
      images = images.filter((element) => {
        element.url !== imageUrlToDelete;
      });
    }
    showDeleteImage = false;
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
  />
</svelte:head>
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

<div class="images-container">
  {#each images as image}
    <Image {image} on:deleteImage={handleDeleteImageOpen} />
  {/each}
  {#if images.length < 4 && button === true}
    <button class="add-img" on:click={() => (showAddImage = true)}>
      <i class="uil uil-plus" />
    </button>
  {/if}
</div>

<style>
  .images-container {
    height: 10rem;
    width: 100%;
    border-radius: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10%;
    overflow-x: auto;
    padding: 1rem;
  }

  .add-img {
    height: 100%;
    aspect-ratio: 1;
    background: none;
    color: var(--red);
    font-size: 5rem;
    border-radius: 1rem;
    border: 3px var(--red) dashed;
    outline: none;
  }

  .add-image-container,
  .delete-image-container {
    display: grid;
    place-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    height: 100%;
    width: 100%;
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
