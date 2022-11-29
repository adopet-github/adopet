<script lang="ts">
  import Button from './Button.svelte';
  import CloseButton from './CloseButton.svelte';

  let animalName = 'animalName';
  let shelterName = 'shelterName';
</script>

<div class="chat-container glass">
  <div class="chat-top-menu">
    <div class="img-container">
      <div class="dummy-img" />
    </div>
    <p class="chat-title">{animalName} <span>from</span> {shelterName}</p>
    <span><CloseButton /></span>
  </div>
  <div class="chat-content">
    <div class="message-1"><p>hi</p></div>
    <div class="message-2"><p>hello</p></div>
    <div class="message-1"><p>hi</p></div>
    <div class="message-2"><p>hello</p></div>
    <div class="message-1"><p>hi</p></div>
    <div class="message-2"><p>hello</p></div>
    <div class="message-1"><p>hi</p></div>
    <div class="message-2"><p>hello</p></div>
    <div class="message-1"><p>hi</p></div>
    <div class="message-2"><p>hello</p></div>
    <div class="message-1"><p>hi</p></div>
    <div class="message-2"><p>hello</p></div>
  </div>
  <div class="chat-input-container">
    <div class="chat-input" />
    <span><Button text={'send'} /></span>
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
    flex-direction: column;
    height: 80%;
    overflow-y: auto;
  }

  .message-1,
  .message-2 {
    background-color: var(--lightgrey);
    max-width: 50%;
    min-width: 15%;
    border-radius: 30px;
    padding: 1rem;
    align-self: flex-start;
  }

  .message-2 {
    align-self: flex-end;
    background-color: var(--red);
    color: var(--white);
    margin-right: 1rem;
  }

  .chat-input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    height: 8%;
  }

  .chat-input-container > span {
    flex: 1;
  }

  .chat-input {
    width: 80%;
    height: 100%;
    border-radius: 30px;
    background-color: var(--white);
    margin-right: 1rem;
  }
</style>
