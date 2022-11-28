<script lang="ts">
  import img4 from '../assets/imgs/mockdog/4.jpg';

  let newMessage = Math.random() > 0.5;

  const handleChatChange = () => {
    console.log('chat changed');
  };
</script>

<button class="match" on:click={handleChatChange}>
  <div class="img-cont">
    <img src={img4} alt="animal" />
    <div class="overlay" />
    {#if newMessage}
      <div class="notification" />
    {/if}
  </div>
  <h1>Buster</h1>
</button>

<style>
  .match {
    min-width: 100px;
    min-height: 140px;
    max-height: 140px;
    display: grid;
    place-items: center;
    background: none;
  }

  .img-cont {
    position: relative;
    min-width: 100%;
    max-width: 100%;
    min-height: 100px;
    max-height: 100px;
  }

  img {
    min-width: 100%;
    max-width: 100%;
    min-height: 100px;
    max-height: 100px;
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
    width: 10px;
    height: 10px;
    background-color: dodgerblue;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    right: -5px;
    display: grid;
    place-items: center;
    transform: translateY(-50%);
    -webkit-box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.3);
  }

  button:focus {
    outline: none;
  }
</style>
