<script lang="ts">
  import Time from 'svelte-time';
  import { retrieveByMatch } from '../../Services/message';
  import { dashView } from '../../Stores/dashView';
  import { messagesByMatch } from '../../Stores/messagesByMatch';
  import { viewMatchChat } from '../../Stores/viewMatchChat';
  import ProfilePic from '../ProfilePic.svelte';

  let msgPreview = '';

  let msgDate: Date;

  // bold if not read

  export let match;

  const getFirstMatchMessage = async () => {
    let adopterId = match.adopter.id;
    let animalId = match.animal.id;
    const res = await retrieveByMatch({ adopterId, animalId });
    if (res.status === 200) {
      res.data[0] && res.data[0].content
        ? ((msgPreview = res.data[res.data.length - 1].content),
          (msgDate = res.data[res.data.length - 1].createdAt))
        : (msgPreview = 'no messages yet');
    }
    msgPreview.length > 20 ? msgPreview.substring(0, 20) + '...' : msgPreview;
  };

  getFirstMatchMessage();

  const handleGoToChatView = async () => {
    viewMatchChat.set(match);
    dashView.set(['matches', 'chat']);
    let adopterId = $viewMatchChat.adopter.id;
    let animalId = $viewMatchChat.animal.id;
    const res = await retrieveByMatch({ adopterId, animalId });
    if (res.status === 200) {
      messagesByMatch.set({
        adopterId,
        animalId,
        messages: res.data
      });
    }
  };
</script>

{#if match}
  <button on:click={handleGoToChatView}>
    <div class="list-item">
      <div class="img-container">
        <ProfilePic
          img={match.adopter.images[0] ? match.adopter.images[0].url : ''}
        />
      </div>
      <div class="msg-details">
        <p class="msg-username">
          {match.adopter.first_name} → {match.animal.name}
        </p>
        <p class="msg-preview">
          {msgPreview}
        </p>
        {#if msgPreview !== 'no messages yet'}
          <p class="msg-date"><Time timestamp={msgDate} relative /></p>
        {/if}
      </div>
      <div class="img-container img-animal">
        <ProfilePic
          img={match.animal.images[0] ? match.animal.images[0].url : ''}
        />
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

  .img-container {
    display: flex;
    height: 60px;
    width: 60px;
    border-radius: 25px;
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
    font-weight: 800;
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
    .img-container {
      height: 40px;
      width: 40px;
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

    .img-animal {
      display: none;
    }
  }
  @media only screen and (max-width: 688px) {
    .msg-username {
      font-size: 1rem;
    }
    .msg-preview {
      font-size: 1rem;
    }
    .msg-date {
      font-size: 0.6rem;
    }

    .img-container {
      height: 60px;
      width: 60px;
    }

    .img-animal {
      display: flex;
    }
  }
</style>
