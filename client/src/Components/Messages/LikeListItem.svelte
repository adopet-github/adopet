<script lang="ts">
  import Time from 'svelte-time';
  import { dashView } from '../../Stores/dashView';
  import { viewAdopterProfile } from '../../Stores/viewAdopterProfile';
  import ProfilePic from '../ProfilePic.svelte';

  export let like;

  const handleAdopterProfileView = () => {
    viewAdopterProfile.set({ ...like.adopter, adopter_animal: like.animal });
    dashView.set(['likes', 'adopter']);
  };
</script>

<button on:click={handleAdopterProfileView}>
  <div class="list-item">
    <div class="img-container">
      <ProfilePic
        img={like.adopter.images[0] ? like.adopter.images[0].url : ''}
      />
    </div>
    <div class="match-details">
      <p class="pet-name">{like.animal.name} was liked by</p>
      <p class="match-username">{like.adopter.first_name}</p>
      <p class="match-date"><Time timestamp={like.date} relative /></p>
    </div>
    <div class="img-container img-animal">
      <ProfilePic
        img={like.animal.images[0] ? like.animal.images[0].url : ''}
      />
    </div>
  </div>
</button>

<style>
  button {
    background: none;
  }
  .list-item {
    width: 100%;
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

  .img-container {
    display: flex;
    height: 60px;
    width: 60px;
    border-radius: 25px;
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
    font-size: 1rem;
    color: var(--red);
    font-weight: 700;
  }

  .pet-name {
    font-size: 0.8rem;
    text-align: left;
  }

  .match-date {
    font-size: 0.6rem;
    color: var(--lavender);
  }

  @media only screen and (max-width: 1280px) {
    .img-container {
      height: 40px;
      width: 40px;
    }
  }

  @media only screen and (max-width: 992px) {
    p {
      font-size: 0.8rem;
    }

    .match-username {
      font-size: 0.8rem;
    }

    .match-date {
      font-size: 0.5rem;
    }

    .img-animal {
      display: none;
    }
  }

  @media only screen and (max-width: 688px) {
    .match-username {
      font-size: 1.2rem;
    }

    .match-date {
      font-size: 0.6rem;
    }
    .img-container {
      height: 60px;
      width: 60px;
    }

    .img-animal {
      display: flex;
    }
  }
</style>
