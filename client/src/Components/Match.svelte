<script lang="ts">
  let newMessage = Math.random() > 0.5;

  const handleChatChange = () => {
    console.log('chat changed');
  };

  export let match;
</script>

{#if match}
  <button class="match" on:click={handleChatChange}>
    <div class="img-cont">
      <img src={match.images[0].url} alt="animal" />
      <div class="overlay" />
      {#if newMessage}
        <div class="notification" />
      {/if}
    </div>
    <h1>{match.name}</h1>
  </button>
{/if}

<style>
  .match {
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    background: none;
    padding: 1rem 0;
  }

  .img-cont {
    position: relative;
    height: 120px;
    aspect-ratio: 1;
  }

  img {
    height: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 25%;
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.1;
    top: 0;
    left: 0;
    border-radius: 25%;
    transition: opacity 300ms ease-in-out;
  }

  .overlay:hover {
    opacity: 0.3;
  }

  h1 {
    font-size: 1.5rem;
  }

  .notification {
    width: 15px;
    height: 15px;
    background-color: dodgerblue;
    border-radius: 50%;
    position: absolute;
    top: 1px;
    right: 1px;
    display: grid;
    place-items: center;
    z-index: 999;
  }

  button:focus {
    outline: none;
  }
</style>
