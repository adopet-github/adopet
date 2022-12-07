<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let image: { caption: string; url: string; id: string };

  const handleImageDelete = () => {
    dispatch('deleteImage', {
      id: image.id,
      url: image.url
    });
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
  />
</svelte:head>

<div class="image">
  <img src={image.url} alt="" />
  <button on:click={handleImageDelete}><i class="uil uil-trash" /></button>
</div>

<style>
  .image {
    height: 100%;
    aspect-ratio: 1;
    border-radius: 1rem;
    position: relative;
  }

  .image:hover > button {
    display: grid;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: inherit;
  }

  button {
    background-color: var(--red);
    position: absolute;
    height: 30px;
    width: 30px;
    color: white;
    place-items: center;
    border-radius: 50%;
    top: -10px;
    right: -10px;
    display: none;
    outline: none;
  }
</style>
