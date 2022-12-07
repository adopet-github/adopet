<script>
  import { onMount } from 'svelte';
  import Chat from '../Components/Chat.svelte';
  import PawsLoader from '../Components/Loaders/PawsLoader.svelte';
  import TypingLoader from '../Components/Loaders/TypingLoader.svelte';
  import Match from '../Components/Match.svelte';
  import { getAdopterMatches } from '../Services/adopter';
  import { userCredentials } from '../Stores/userCredentials';
  import { fade } from 'svelte/transition';
  import { Link } from 'svelte-navigator';

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
  {#if matches.length}
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
  {:else}
    <div class="no-matches">
      <PawsLoader />
      <TypingLoader>You don't have any matches yet...</TypingLoader>
      <p in:fade={{ delay: 1500 }}>
        Find your perfect match now by swiping or improving your profile
      </p>
      <div class="buttons">
        <button><Link to="/user/swipe">SWIPE</Link></button>
        <button><Link to="/settings">PROFILE</Link></button>
      </div>
    </div>
  {/if}
</div>

<style>
  .no-matches {
    display: flex;
    flex-direction: column;
    gap: 5rem;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .no-matches p {
    font-size: 1.25rem;
  }

  .buttons {
    display: flex;
    gap: 5rem;
  }

  button {
    width: 250px;
    height: 75px;
    border-radius: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
  }

  @media only screen and (max-width: 610px) {
    button {
      width: 150px;
      font-size: 1.25rem;
    }
    .no-matches p {
      text-align: center;
      width: 80%;
    }
  }

  @media only screen and (max-width: 400px) {
    .buttons {
      gap: 2rem;
    }
  }
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
