<script>
  import Chat from '../Components/Chat.svelte';
  import Match from '../Components/Match.svelte';

  let matches = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
    padding: 1rem;
    display: flex;
    gap: 1rem;
    overflow-x: scroll;
  }

  .chat {
    height: 75%;
  }
</style>
