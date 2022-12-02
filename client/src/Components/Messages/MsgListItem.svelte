<script lang="ts">
  import Time from 'svelte-time';
  import { retrieveByMatch } from '../../Services/message';
  import { dashView } from '../../Stores/dashView';
  import { messagesByMatch } from '../../Stores/messagesByMatch';
  import { viewMatchChat } from '../../Stores/viewMatchChat';

  let message = 'this should be a message preview'; // preview of last message
  let msgDate: Date = new Date(); // needs to be time of last sent message

  // bold if not read

  export let match;

  // console.log('match: ', match);

  const handleGoToChatView = async () => {
    viewMatchChat.set(match);
    dashView.set('msgs');
    let adopterId = $viewMatchChat.adopter.id;
    let animalId = $viewMatchChat.animal.id;
    const res = await retrieveByMatch({ adopterId, animalId });
    if (res.status === 200) {
      messagesByMatch.set(res.data);
    }
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
  />
</svelte:head>
{#if match}
  <button on:click={handleGoToChatView}>
    <div class="list-item">
      <div class="img-container">
        {#if match.adopter.images.length}
          <img
            class="dummy-img"
            src={match.adopter.images[0].url}
            alt={match.adopter.images[0].caption}
          />
        {:else}
          <div class="dummy-img">
            <i class="uil uil-user-circle" />
          </div>
        {/if}
      </div>
      <div class="msg-details">
        <p class="msg-username">{match.adopter.first_name}</p>
        <p class="msg-preview">{message}</p>
        <p class="msg-date"><Time timestamp={msgDate} relative /></p>
      </div>
    </div>
  </button>
{/if}

<style>
  button {
    background: none;
  }
  .list-item {
    width: 100%;
    /* border-radius: 30px; */
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 0.5px solid var(--lightgrey);
    position: relative;
    padding: 0.5rem 1rem;
    gap: 1rem;
  }

  .list-item:hover {
    background-color: rgba(0, 0, 0, 0.2);
    mix-blend-mode: multiply;
  }

  .dummy-img {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    position: relative;
    background-color: var(--grey);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .msg-details {
    padding: 0.5rem 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
  }

  .msg-username {
    color: var(--red);
    font-size: 0.8rem;
  }

  .msg-preview {
    font-size: 1rem;
    text-align: left;
  }

  .msg-date {
    font-size: 0.6rem;
    color: var(--lavender);
  }

  i {
    font-size: 3rem;
    color: white;
  }

  @media only screen and (max-width: 992px) {
    p {
      font-size: 0.8rem;
    }
    .dummy-img {
      height: 30px;
      width: 30px;
      border-radius: 20px;
    }

    .msg-username {
      color: var(--red);
      font-size: 0.8rem;
    }

    .msg-date {
      font-size: 0.5rem;
      color: var(--lavender);
    }
  }
</style>
