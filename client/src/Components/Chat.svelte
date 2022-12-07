<script lang="ts">
  import { io } from 'socket.io-client';
  import Time from 'svelte-time/src/Time.svelte';

  import { afterUpdate, beforeUpdate } from 'svelte';
  import Button from './Button.svelte';
  import CloseButton from './CloseButton.svelte';
  import { createMessage } from '../Services/message';
  import type { Message } from '../types/message';
  import { viewMatchChat } from '../Stores/viewMatchChat';
  import { messagesByMatch } from '../Stores/messagesByMatch';
  import { dashView } from '../Stores/dashView';
  import { viewAdopterProfile } from '../Stores/viewAdopterProfile';
  import ProfilePic from './ProfilePic.svelte';
  import { userCredentials } from '../Stores/userCredentials';

  let chat;
  let autoscroll;
  let value = '';
  let accountType = $userCredentials.house_type ? 'adopter' : 'shelter';

  const socket = io(import.meta.env.VITE_API_URL);

  socket.on('connect', () => console.log('sockets connected'));

  socket.on('message', (msg) => {
    if (
      msg.adopterId !== $messagesByMatch.adopterId ||
      msg.animalId !== $messagesByMatch.animalId
    )
      return;
    messagesByMatch.update((prev) => {
      return {
        ...prev,
        messages: [...prev.messages, msg]
      };
    });
  });

  beforeUpdate(() => {
    autoscroll =
      chat && chat.offsetHeight + chat.scrollTop > chat.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) chat.scrollTo(0, chat.scrollHeight);
  });

  const handleSend = async (event) => {
    if (event.key === 'Enter') {
      const content = event.target.value;
      if (!content) return;
      let message: Message = {
        author: accountType,
        content,
        adopterId: $viewMatchChat.adopter.id,
        animalId: $viewMatchChat.animal.id
      };
      await createMessage(message);
      event.target.value = '';
    }

    if (event.type === 'click') {
      const content = value;
      if (!content) return;
      let message: Message = {
        author: accountType,
        content,
        adopterId: $viewMatchChat.adopter.id,
        animalId: $viewMatchChat.animal.id
      };
      await createMessage(message);
      value = '';
    }
  };
</script>

{#if $viewMatchChat}
  <div class="chat-container glass">
    <div class="chat-top-menu">
      <div class="img-container">
        <button
          on:click={() => {
            viewAdopterProfile.set($viewMatchChat.adopter);
            dashView.set(['matches', 'adopter']);
          }}
          ><ProfilePic
            img={$viewMatchChat.adopter.images[0]
              ? $viewMatchChat.adopter.images[0].url
              : ''}
          /></button
        >
      </div>
      <p class="chat-title">
        {$viewMatchChat.adopter.first_name}
        <span>matched with</span>
        {$viewMatchChat.animal.name}
      </p>
      <span
        ><CloseButton
          sideCloseTo={'matches'}
          closeTo={window.innerWidth > 688
            ? 'animalList'
            : 'mobileLikeMatchList'}
        /></span
      >
    </div>
    <div class="chat-content" bind:this={chat}>
      {#each $messagesByMatch.messages as message}
        {#if message.author === accountType}
          <div class="account-msg">
            <p>{message.content}</p>
            <p class="timestamp">
              <Time
                timestamp={message.createdAt}
                format={message.createdAt === new Date()
                  ? 'HH:MM'
                  : 'HH:MM - DD/MM/YY'}
              />
            </p>
          </div>
        {:else}
          <div class="other-msg">
            <p>{message.content}</p>
            <p class="timestamp">
              <Time
                timestamp={message.createdAt}
                format={message.createdAt === new Date()
                  ? 'HH:MM'
                  : 'HH:MM - DD/MM/YY'}
              />
            </p>
          </div>
        {/if}
      {/each}
    </div>
    <div class="chat-input-container">
      <input
        type="text"
        class="chat-input"
        on:keydown={handleSend}
        bind:value
      />
      <span><Button text={'send'} on:click={handleSend} /></span>
    </div>
  </div>
{/if}

<style>
  .chat-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 30px;
    padding: 0 1rem 1rem 1rem;
  }

  span {
    color: var(--red);
    height: 100%;
  }

  .chat-title {
    font-weight: 700;
    color: var(--black);
  }

  .chat-title span {
    font-weight: normal;
    color: var(--lavender);
  }

  .chat-top-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px var(--lightgrey);
    padding: 0.5rem 0;
  }

  .img-container {
    display: flex;
    height: 60px;
    width: 60px;
    border-radius: 25px;
  }

  .chat-content {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    height: 80%;
    border-bottom: solid 1px var(--lightgrey);
    overflow-y: auto;
    padding: 0.5rem 0;
  }

  .other-msg,
  .account-msg {
    background-color: var(--lightgrey);
    max-width: 50%;
    min-width: 15%;
    border-radius: 30px 30px 30px 15px;
    padding: 1rem;
    align-self: flex-start;
  }

  .account-msg {
    align-self: flex-end;
    background-color: var(--red);
    color: var(--white);
    margin-right: 1rem;
    border-radius: 30px 30px 15px 30px;
  }

  .chat-input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    gap: 1rem;
    align-items: stretch;
  }

  .chat-input-container > span {
    flex: 1;
    display: flex;
  }

  .chat-input {
    width: 80%;
    height: 100%;
    border-radius: 20px;
    background-color: var(--white);
    font-size: 1rem;
  }

  .timestamp {
    font-size: 0.6rem;
    opacity: 0.5;
  }

  button {
    background: none;
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (max-width: 688px) {
    .other-msg,
    .account-msg {
      padding: 0.8rem;
    }

    .chat-container {
      border-radius: 0px;
    }
  }
</style>
