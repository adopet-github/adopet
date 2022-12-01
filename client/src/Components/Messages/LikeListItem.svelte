<script lang="ts">
  import Time from 'svelte-time';
  import { dashView } from '../../Stores/dashView';
  import { viewAdopterProfile } from '../../Stores/viewAdopterProfile';
  import type { Pet } from '../../types/animal';

  export let animal: Pet;

  $viewAdopterProfile = animal.adopters[0];

  console.log('list item', animal);

  let msgDate: Date = new Date();
</script>

<button on:click={() => ($dashView = 'match')}>
  <div class="list-item">
    <span class="dummy-img" />
    <div class="match-details">
      <p class="pet-name">{animal.name}</p>
      <p class="match-username">{animal.adopters[0].first_name}</p>
      <p class="match-date"><Time timestamp={msgDate} relative /></p>
    </div>
    <span class="dummy-img2" />
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
