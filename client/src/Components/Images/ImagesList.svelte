<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Image from './Image.svelte';

  const dispatch = createEventDispatcher();

  const handleDelete = (e) => {
    console.log(e.detail.id);
    dispatch('deleteImage', {
      id: e.detail.id
    });
  };

  export let images = [];
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
  />
</svelte:head>

<div class="images-container">
  {#each images as image}
    <Image {image} on:deleteImage={handleDelete} />
  {/each}
  {#if images.length < 4}
    <button on:click={() => dispatch('openAddImage')}>
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
    overflow-x: scroll;
    padding: 1rem;
  }

  button {
    height: 100%;
    aspect-ratio: 1;
    background: none;
    color: var(--red);
    font-size: 5rem;
    border-radius: 1rem;
    border: 3px var(--red) dashed;
    outline: none;
  }
</style>
