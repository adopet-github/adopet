<script lang="ts">
  import { io } from 'socket.io-client';

  import { afterUpdate, beforeUpdate, onMount } from 'svelte';
  import Button from './Button.svelte';
  import CloseButton from './CloseButton.svelte';
  import { createMessage, retrieveByMatch } from '../Services/message';
  import type { Message } from '../types/message';
  import { viewMatchChat } from '../Stores/viewMatchChat';
  import { messagesByMatch } from '../Stores/messagesByMatch';

  let chat;
  let autoscroll;
  let value = '';

  const socket = io('http://localhost:4000');

  socket.on('connect', () => console.log('sockets connected'));

  socket.on('message', () => {
    console.log('from socket:  ', socket);
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
        author: 'shelter',
        content,
        adopterId: $viewMatchChat.adopter.id,
        animalId: $viewMatchChat.animal.id
      };
      $messagesByMatch = $messagesByMatch.concat(message);
      await createMessage(message);
      event.target.value = '';
    }

    if (event.type === 'click') {
      const content = value;
      if (!content) return;
      let message: Message = {
        author: 'shelter',
        content,
        adopterId: $viewMatchChat.adopter.id,
        animalId: $viewMatchChat.animal.id
      };
      $messagesByMatch = $messagesByMatch.concat(message);
      await createMessage(message);
      value = '';
    }
  };
</script>

{#if $viewMatchChat}
  <div class="chat-container glass">
    <div class="chat-top-menu">
      <div class="img-container">
        <div class="dummy-img" />
      </div>
      <p class="chat-title">
        {$viewMatchChat.adopter.first_name}
        <span>matched with</span>
        {$viewMatchChat.animal.name}
      </p>
      <span><CloseButton /></span>
    </div>
    <div class="chat-content" bind:this={chat}>
      {#each $messagesByMatch as message}
        {#if message.author === 'shelter'}
          <div class="shelter-msg"><p>{message.content}</p></div>
        {:else}
          <div class="adopter-msg"><p>{message.content}</p></div>
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
    display: flex;
    flex-direction: column;
    border-radius: 30px;
    padding: 0 1rem 1rem 1rem;
  }

  span {
    color: var(--red);
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

  .dummy-img {
    height: 50px;
    width: 50px;
    border-radius: 25px;
    background-color: var(--grey);
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

  .adopter-msg,
  .shelter-msg {
    background-color: var(--lightgrey);
    max-width: 50%;
    min-width: 15%;
    border-radius: 30px 30px 30px 15px;
    padding: 1rem;
    align-self: flex-start;
  }

  .shelter-msg {
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
  }

  .chat-input-container > span {
    flex: 1;
  }

  .chat-input {
    width: 80%;
    height: 100%;
    border-radius: 20px;
    background-color: var(--white);
    font-size: 1rem;
  }
</style>
