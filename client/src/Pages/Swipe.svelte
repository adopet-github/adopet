<script lang="ts">
  import SwipeCard from '../Components/SwipeCard.svelte';
  import { onMount } from 'svelte';
  import { getAllAnimals } from '../Services/animal';
  import { likeAnimal, dislikeAnimal } from '../Services/adopter';
  import { userCredentials } from '../Stores/userCredentials';
  import PawsLoader from '../Components/Loaders/PawsLoader.svelte';

  let infoOpen = true;

  const toggleInfoOpen = () => {
    infoOpen = !infoOpen;
  };

  let animals = [];

  onMount(async () => {
    const res = await getAllAnimals();
    animals = res.data.filter((animal) => animal.images.length === 4);
    for (let i = 0; i < animals.length; i++) {
      animals.sort(() => Math.random() - 0.5);
    }
    console.log('animals', animals);
  });
  let activeIndex = 0;

  const handleNo = async () => {
    if (!infoOpen) toggleInfoOpen();
    const res = await dislikeAnimal(
      $userCredentials.id,
      animals[activeIndex].id
    );

    const nextIndex = activeIndex + 1;

    const current = document.querySelector(
      `[data-index="${activeIndex}"]`
    ) as HTMLElement;
    const next = document.querySelector(
      `[data-index="${nextIndex}"]`
    ) as HTMLElement;

    if (!next) {
      activeIndex = nextIndex;
      return;
    }

    current.dataset.status = 'left';

    next.dataset.status = 'move-right';

    setTimeout(() => {
      next.dataset.status = 'active';
      activeIndex = nextIndex;
    }, 300);

    removeIds();
  };

  const removeIds = () => {
    const zero = document.getElementById('zero');
    zero.removeAttribute('id');
    const one = document.getElementById('one');
    one.removeAttribute('id');
    const two = document.getElementById('two');
    two.removeAttribute('id');
    const three = document.getElementById('three');
    three.removeAttribute('id');
  };

  const handleYes = async () => {
    if (!infoOpen) toggleInfoOpen();

    const res = await likeAnimal($userCredentials.id, animals[activeIndex].id);

    const nextIndex = activeIndex + 1;

    const current = document.querySelector(
      `[data-index="${activeIndex}"]`
    ) as HTMLElement;
    const next = document.querySelector(
      `[data-index="${nextIndex}"]`
    ) as HTMLElement;

    if (!next) {
      activeIndex = nextIndex;
      return;
    }

    current.dataset.status = 'right';

    next.dataset.status = 'move-left';

    setTimeout(() => {
      next.dataset.status = 'active';
      activeIndex = nextIndex;
      console.log('index', activeIndex, 'len', animals.length);
    }, 300);

    removeIds();
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
  />
</svelte:head>

{#if activeIndex >= animals.length}
  <div class="no-animals-cont">
    <PawsLoader />
    <div class="text">
      <h1>No pets available at the moment</h1>
      <p>We're searching for your perfect match...</p>
    </div>
  </div>
{:else}
  <div class="container">
    <div class="groups">
      {#each animals as animal, i}
        <SwipeCard {infoOpen} index={i} {animal} {activeIndex} />
      {/each}
    </div>
    <div class="buttons">
      <button class="no" on:click={handleNo}>
        <i class="uil uil-times" />
      </button>
      <button class="info" on:click={toggleInfoOpen}>
        <i class="uil uil-info" />
      </button>
      <button class="yes" on:click={handleYes}>
        <i class="uil uil-heart" />
      </button>
    </div>
  </div>
{/if}

<style>
  .no-animals-cont {
    color: black;
    background: rgb(235, 224, 224);
    background: linear-gradient(
      45deg,
      rgba(235, 224, 224, 1) 0%,
      rgba(255, 242, 237, 1) 100%
    );
    height: 92vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10rem;
  }

  .no-animals-cont h1 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  .no-animals-cont p {
    font-size: 1.25rem;
    text-align: center;
  }

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

  .groups {
    width: 300px;
    aspect-ratio: 5 / 7;
  }
  .buttons {
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (max-width: 500px) and (max-height: 900px) {
    .container {
      padding-bottom: 1rem;
    }
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
