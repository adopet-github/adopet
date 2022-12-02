<script lang="ts">
  import { onMount } from 'svelte';
  import { getShelterLikes } from '../../Services/shelter';
  import { userCredentials } from '../../Stores/userCredentials';
  import MsgListItem from './MsgListItem.svelte';
  import { dashView } from '../../Stores/dashView';
  import LikeListItem from './LikeListItem.svelte';
  import { animalLikes } from '../../Stores/animalLikes';

  export let matches = [];

  onMount(async () => {
    const res = await getShelterLikes($userCredentials.id);
    if (res.status === 200) {
      animalLikes.set(res.data);
    }
  });
</script>

<div class="sidebar-list">
  {#if $dashView === 'msgs'}
    {#each matches as match}
      <MsgListItem {match} />
    {/each}
  {:else if $animalLikes.length}
    {#each $animalLikes as like}
      <LikeListItem {like} />
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
