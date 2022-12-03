<script lang="ts">
  import Time from 'svelte-time';
  import { retrieveByMatch } from '../../Services/message';
  import { dashView } from '../../Stores/dashView';
  import { messagesByMatch } from '../../Stores/messagesByMatch';
  import { viewMatchChat } from '../../Stores/viewMatchChat';
  import ProfilePic from '../ProfilePic.svelte';

  let text = 'this should be a message preview';

  let message = text.substring(0, 25) + '...'; // preview of last message
  let msgDate: Date = new Date(); // needs to be time of last sent message

  // bold if not read

  export let match;

  // console.log('match: ', match);

  const handleGoToChatView = async () => {
    viewMatchChat.set(match);
    dashView.set(['matches', 'chat']);
    let adopterId = $viewMatchChat.adopter.id;
    let animalId = $viewMatchChat.animal.id;
    const res = await retrieveByMatch({ adopterId, animalId });
    if (res.status === 200) {
      messagesByMatch.set(res.data);
    }
  };
</script>

{#if match}
  <button on:click={handleGoToChatView}>
    <div class="list-item">
      <span
        ><ProfilePic
          img={match.adopter.images[0] ? match.adopter.images[0].url : ''}
        /></span
      >
      <div class="msg-details">
        <p class="msg-username">
          {match.adopter.first_name} → {match.animal.name}
        </p>
        <p class="msg-preview">{message}</p>
        <p class="msg-date"><Time timestamp={msgDate} relative /></p>
      </div>
      <span
        ><ProfilePic
          img={match.animal.images[0] ? match.animal.images[0].url : ''}
        /></span
      >
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
    text-align: left;
  }

  .msg-preview {
    font-size: 1rem;
    text-align: left;
  }

  .msg-date {
    font-size: 0.6rem;
    color: var(--lavender);
    text-align: left;
  }

  @media only screen and (max-width: 1280px) {
    .msg-preview {
      font-size: 0.8rem;
      text-align: left;
    }
  }

  @media only screen and (max-width: 992px) {
    p {
      font-size: 0.8rem;
    }
    .msg-username {
      color: var(--red);
      font-size: 0.8rem;
    }

    .msg-date {
      font-size: 0.5rem;
      color: var(--lavender);
    }

    span {
      display: none;
    }
  }
</style>
