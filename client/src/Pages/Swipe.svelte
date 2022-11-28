<script lang="ts">
  import SwipeCard from '../Components/SwipeCard.svelte';

  let infoOpen = true;

  const toggleInfoOpen = () => {
    infoOpen = !infoOpen;
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
  />
</svelte:head>

<div class="container">
  <SwipeCard {infoOpen} />
  <div class="buttons">
    <button class="no">
      <i class="uil uil-times" />
    </button>
    <button class="info" on:click={toggleInfoOpen}>
      <i class="uil uil-info" />
    </button>
    <button class="yes">
      <i class="uil uil-heart" />
    </button>
  </div>
</div>

<style>
  .container {
    color: black;
    background: rgb(235, 224, 224);
    background: linear-gradient(
      45deg,
      rgba(235, 224, 224, 1) 0%,
      rgba(255, 242, 237, 1) 100%
    );
    height: 92vh;
    display: grid;
    place-items: center;
    align-items: flex-end;
    padding-bottom: 3rem;
  }
  .buttons {
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
  }

  button {
    background: none;
    font-size: 3rem;
    aspect-ratio: 1;
    width: 80px;
    border-radius: 50%;
  }

  .info {
    border: solid 4px rgb(33, 150, 243);
    color: rgb(33, 150, 243);
  }

  .info:hover {
    -webkit-box-shadow: 0px 0px 10px 5px rgba(32, 150, 243, 0.3);
    -moz-box-shadow: 0px 0px 10px 5px rgba(32, 150, 243, 0.3);
    box-shadow: 0px 0px 10px 5px rgba(32, 150, 243, 0.3);
  }

  .no {
    border: solid 4px var(--red);
    color: var(--red);
  }

  .no:hover {
    -webkit-box-shadow: 0px 0px 10px 5px rgba(211, 62, 67, 0.3);
    -moz-box-shadow: 0px 0px 10px 5px rgba(211, 62, 67, 0.3);
    box-shadow: 0px 0px 10px 5px rgba(211, 62, 67, 0.3);
  }

  .yes {
    border: solid 4px #37a169;
    color: #37a169;
  }

  .yes:hover {
    -webkit-box-shadow: 0px 0px 10px 5px rgba(55, 161, 105, 0.3);
    -moz-box-shadow: 0px 0px 10px 5px rgba(55, 161, 105, 0.3);
    box-shadow: 0px 0px 10px 5px rgba(55, 161, 105, 0.3);
  }
</style>
