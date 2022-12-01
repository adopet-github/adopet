<script lang="ts">
  import { onMount } from 'svelte';
  import { getShelterById, getShelterMatches } from '../../Services/shelter';
  import { userCredentials } from '../../Stores/userCredentials';
  import type { Pet } from '../../types/animal';
  import MsgListItem from './MsgListItem.svelte';
  import { dashView } from '../../Stores/dashView';
  import LikeListItem from './LikeListItem.svelte';

  let likedAnimals: Array<Pet> = [];
  let matches = [];

  onMount(async () => {
    const res = await getShelterById($userCredentials.id);
    if (res.status === 200) {
      likedAnimals = res.data.animals.filter((element) => {
        return element.adopters.length > 0;
      });
    }
  });

  onMount(async () => {
    const res = await getShelterMatches($userCredentials.id);
    if (res.status === 200) {
      matches = res.data;
    }
  });
</script>

<div class="sidebar-list">
  {#if $dashView === 'msgs'}
    <MsgListItem />
  {:else if likedAnimals}
    {#each likedAnimals as animal}
      <LikeListItem {animal} />
    {/each}
  {:else}
    <p>No likes at the moment 🐈🐕</p>
  {/if}
</div>

<style>
  .sidebar-list {
    max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
</style>
