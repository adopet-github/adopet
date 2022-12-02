<script lang="ts">
  import Time from 'svelte-time';
  import { dashView } from '../../Stores/dashView';
  import { viewAdopterProfile } from '../../Stores/viewAdopterProfile';

  export let like;

  const handleAdopterProfileView = () => {
    viewAdopterProfile.set({ ...like.adopter, adopter_animal: like.animal });
    dashView.set('match');
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
  />
</svelte:head>

<button on:click={handleAdopterProfileView}>
  <div class="list-item">
    {#if like.adopter.images.length}
      <img
        class="dummy-img"
        src={like.adopter.images[0].url}
        alt={like.adopter.images[0].caption}
      />
    {:else}
      <div class="dummy-img">
        <i class="uil uil-user-circle" />
      </div>
    {/if}
    <div class="match-details">
      <p class="pet-name">{like.animal.name}</p>
      <p class="match-username">{like.adopter.first_name}</p>
      <p class="match-date"><Time timestamp={like.date} relative /></p>
    </div>
    {#if like.animal.images.length}
      <img
        class="dummy-img2"
        src={like.animal.images[0].url}
        alt={like.animal.images[0].caption}
      />
    {:else}
      <div class="dummy-img2">
        <i class="uil uil-user-circle" />
      </div>
    {/if}
  </div>
</button>

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

  .dummy-img,
  .dummy-img2 {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    position: relative;
    background-color: var(--grey);
    display: grid;
    place-items: center;
    color: white;
    font-size: 2.5rem;
  }

  .dummy-img2 {
    background-color: var(--red);
  }

  .match-details {
    padding: 0.5rem 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
  }

  .match-username {
    color: var(--red);
    font-size: 0.8rem;
  }

  .match-username {
    font-size: 1.4rem;
  }

  .pet-name {
    font-size: 1rem;
    text-align: left;
  }

  .pet-name {
    font-size: 0.8rem;
  }

  .match-date {
    font-size: 0.6rem;
    color: var(--lavender);
  }

  @media only screen and (max-width: 992px) {
    p {
      font-size: 0.8rem;
    }
    .dummy-img,
    .dummy-img2 {
      height: 30px;
      width: 30px;
      border-radius: 20px;
    }

    .match-username {
      color: var(--red);
      font-size: 0.8rem;
    }

    .match-date {
      font-size: 0.5rem;
      color: var(--lavender);
    }
  }
</style>
