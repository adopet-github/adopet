<script>
  import { onMount } from 'svelte';
  import Chat from '../Components/Chat.svelte';
  import Match from '../Components/Match.svelte';
  import { getAdopterMatches } from '../Services/adopter';
  import { userCredentials } from '../Stores/userCredentials';
  import { dashView } from '../Stores/dashView';
  import { viewMatchChat } from '../Stores/viewMatchChat';
  import { retrieveByMatch } from '../Services/message';
  import { messagesByMatch } from '../Stores/messagesByMatch';

  let matches = [];

  onMount(async () => {
    const res = await getAdopterMatches($userCredentials.id);
    console.log(res);
    if (res.status === 200) {
      matches = res.data;
    }
    console.log(matches);
  });
</script>

<div class="container">
  <div class="matches glass">
    <div class="matches-container">
      {#each matches as match}
        <Match {match} />
      {/each}
    </div>
  </div>
  <div class="chat">
    <Chat />
  </div>
</div>

<style>
  .container {
    color: black;
    height: 92vh;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .matches {
    height: 25%;
    border-radius: 1.5rem;
    display: flex;
    align-items: center;
    padding: 0 1rem;
  }

  .matches-container {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
  }

  .chat {
    height: 75%;
  }
</style>
