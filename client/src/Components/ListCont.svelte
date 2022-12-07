<script lang="ts">
  import { userCredentials } from '../Stores/userCredentials';
  import ListItem from './ListItem.svelte';

  const shelterAnimals = $userCredentials.animals;
</script>

<div class="list-container">
  {#if shelterAnimals}
    {#each $userCredentials.animals as animal}
      <ListItem {animal} />
    {/each}
  {:else}
    <p>Add an animal to get started 🐈🐕</p>
  {/if}
</div>

<style>
</style>
