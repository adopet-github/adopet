<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Image from './Image.svelte';
  import { toast, SvelteToast } from '@zerodevx/svelte-toast';
  import { cloudinaryUpload } from '../../Services/Cloudinary';
  import { addAnimalImage, updateAnimal } from '../../Services/animal';
  import { deleteImage } from '../../Services/image';
  import { selectedAnimal } from '../../Stores/selectedAnimal';
  import ImageInput from '../Inputs/ImageInput.svelte';
  import { userCredentials } from '../../Stores/userCredentials';
  import { addShelterImage, updateShelter } from '../../Services/shelter';
  import { addAdopterImage, updateAdopter } from '../../Services/adopter';
  import Button from '../Button.svelte';

  let showAddImage = false;
  let isLoadingResponse = false;

  let fileInput;

  export let button = true;
  export let images = [];
  export let type = 'animal';
  let accountType = $userCredentials.house_type ? 'adopter' : 'shelter';

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
    let serverRes;
    if (type === 'profile') {
      if (accountType === 'adopter') {
        // ADOPTER
        serverRes = await addAdopterImage(image, $userCredentials.id);
      } else {
        // SHELTER
        serverRes = await addShelterImage(image, $userCredentials.id);
      }
      userCredentials.update((prev) => ({
        ...prev,
        images: [...prev.images, { ...image, id: serverRes.data[0].id }]
      }));
    } else {
      if ($selectedAnimal.id) {
        // EXISITNG ANIMAL
        const serverRes = await addAnimalImage(image, $selectedAnimal.id);
        selectedAnimal.update((prev) => ({
          ...prev,
          images: [...prev.images, { ...image, id: serverRes.data[0].id }]
        }));
      } else {
        // ADDING ANIMAL
        images = [...images, image];
      }
    }
    showAddImage = false;
    isLoadingResponse = false;
  };

  let imageIdToDelete;
  let imageUrlToDelete;
  let imageIdIfNotSaved;
  let showDeleteImage = false;

  const handleDeleteImageOpen = (e) => {
    showDeleteImage = true;
    imageIdToDelete = e.detail.id;
    imageUrlToDelete = e.detail.url;
    console.log(imageIdToDelete);
    console.log(imageUrlToDelete);
    console.log('first', images);
  };

  const handleImageDelete = async () => {
    if (type === 'animal') {
      // EXISTING ANIMAL
      if (imageIdToDelete) {
        const res = await deleteImage(imageIdToDelete);
        console.log(res);
        selectedAnimal.update((prev) => ({
          ...prev,
          images: prev.images.filter((image) => image.id !== imageIdToDelete)
        }));
      } else {
        // DELETES IF DELETE PRESSED BEFORE UPLOAD IS SAVE
        images = images.filter((element) => element.url != imageUrlToDelete);
      }
    } else {
      // SHELTER & ADOPTER AFTER SAVE
      if (imageIdToDelete) {
        const res = await deleteImage(imageIdToDelete);
        console.log(res);
        userCredentials.update((prev) => ({
          ...prev,
          images: prev.images.filter((image) => image.id !== imageIdToDelete)
        }));
      } else {
        // NEED TO DEAL WITH SHELTER & ADOPTER BEFORE SAVE
        console.log('final', images);
        images = images.filter((element) => element.url != imageUrlToDelete);
      }
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
  <div class="warning-container glass">
    <div class="warning">
      <ImageInput bind:fileInput />
      <div class="buttons">
        <Button
          text="CANCEL"
          colour={'white'}
          on:click={() => (showAddImage = false)}
        />
        <Button
          text={isLoadingResponse ? 'UPLOADING...' : 'ADD'}
          on:click={handleImageUpload}
        />
      </div>
    </div>
  </div>
{:else if showDeleteImage}
  <div class="warning-container glass">
    <div class="warning">
      <p class="warn-msg">Are you sure you want to delete this image?</p>
      <p class="smallprint">This action cannot be undone</p>
      <div class="buttons">
        <Button text="CANCEL" on:click={() => (showDeleteImage = false)} />

        <Button
          text={isLoadingResponse ? 'DELETING...' : 'DELETE'}
          colour={'white'}
          on:click={handleImageDelete}
        />
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
    width: auto;
    aspect-ratio: 1;
    background: none;
    color: var(--red);
    font-size: 5rem;
    border-radius: 1rem;
    border: 3px var(--red) dashed;
    outline: none;
  }

  .warning-container {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
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

  .warn-msg {
    font-size: 1.6rem;
  }

  .smallprint {
    font-size: 1rem;
    text-align: center;
    color: var(--red);
    font-weight: 900;
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
</style>
