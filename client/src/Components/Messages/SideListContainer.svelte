<script lang="ts">
  import { onMount } from 'svelte';
  import { getShelterLikes, getShelterMatches } from '../../Services/shelter';
  import { userCredentials } from '../../Stores/userCredentials';
  import MsgListItem from './MsgListItem.svelte';
  import { dashView } from '../../Stores/dashView';
  import LikeListItem from './LikeListItem.svelte';
  import { animalLikes } from '../../Stores/animalLikes';
  import { viewMatchChat } from '../../Stores/viewMatchChat';
  import { shelterMatches } from '../../Stores/shelterMatches';

  export const matches = [];

  onMount(async () => {
    const res = await getShelterLikes($userCredentials.id);
    if (res.status === 200) {
      animalLikes.set(res.data);
    }
  });

  onMount(async () => {
    const res = await getShelterMatches($userCredentials.id);
    if (res.status === 200) {
      shelterMatches.set(res.data);
      viewMatchChat.set($shelterMatches[0]);
    }
  });
</script>

<div class="sidebar-list">
  {#if $dashView[0] === 'matches'}
    {#if $shelterMatches.length}
      {#each $shelterMatches as match}
        <MsgListItem {match} />
      {/each}
    {:else}
      <div class="no-likes">
        <p>No matches at the moment 🐈🐕</p>
      </div>
    {/if}
  {:else if $animalLikes.length}
    {#each $animalLikes as like}
      <LikeListItem {like} />
    {/each}
  {:else}
    <div class="no-likes">
      <p>No likes at the moment 🐈🐕</p>
    </div>
  {/if}
</div>

<style>
  .sidebar-list {
    max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .no-likes {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
