<script lang="ts">
  import { afterUpdate, beforeUpdate } from 'svelte';
  import { userCredentials } from '../Stores/userCredentials';
  import Button from './Button.svelte';
  import CloseButton from './CloseButton.svelte';

  let animalName = 'animalName';
  let shelterName = 'shelterName';

  let chat;
  let autoscroll;
  let value = '';

  let messages = [
    { author: 'user', text: 'hello!' },
    { author: 'non-user', text: 'hey!' }
  ];

  beforeUpdate(() => {
    autoscroll =
      chat && chat.offsetHeight + chat.scrollTop > chat.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) chat.scrollTo(0, chat.scrollHeight);
  });

  function handleSend(event) {
    if (event.key === 'Enter') {
      const text = event.target.value;
      if (!text) return;
      messages = messages.concat({
        author: 'user',
        text
      });
      event.target.value = '';
    }

    if (event.type === 'click') {
      const text = value;
      if (!text) return;
      messages = messages.concat({
        author: 'user',
        text
      });
      value = '';
    }
  }
</script>

<div class="chat-container glass">
  <div class="chat-top-menu">
    <div class="img-container">
      <div class="dummy-img" />
    </div>
    <p class="chat-title">{animalName} <span>from</span> {shelterName}</p>
    <span><CloseButton /></span>
  </div>
  <div class="chat-content" bind:this={chat}>
    {#each messages as message}
      {#if message.author === 'user'}
        <div class="user-msg"><p>{message.text}</p></div>
      {:else}
        <div class="non-user-msg">{message.text}</div>
      {/if}
    {/each}
  </div>
  <div class="chat-input-container">
    <input type="text" class="chat-input" on:keydown={handleSend} bind:value />
    <span><Button text={'send'} on:click={handleSend} /></span>
  </div>
</div>

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
    height: 10%;
    margin-bottom: 1rem;
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
    overflow-y: auto;
  }

  .non-user-msg,
  .user-msg {
    background-color: var(--lightgrey);
    max-width: 50%;
    min-width: 15%;
    border-radius: 30px 30px 30px 15px;
    padding: 1rem;
    align-self: flex-start;
  }

  .user-msg {
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
