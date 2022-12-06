<script lang="ts">
  import Button from '../Components/Button.svelte';
  import Chat from '../Components/Chat.svelte';
  import DashStats from '../Components/DashStats.svelte';
  import ListCont from '../Components/ListCont.svelte';
  import SideListContainer from '../Components/Messages/SideListContainer.svelte';
  import { useNavigate } from 'svelte-navigator';
  import AnimalProfile from '../Components/AnimalProfile.svelte';
  import { dashView } from '../Stores/dashView';
  import AdopterProfile from '../Components/AdopterProfile.svelte';
  import { userCredentials } from '../Stores/userCredentials';
  import { animalLikes } from '../Stores/animalLikes';
  import { shelterMatches } from '../Stores/shelterMatches';
  import AddPet from './AddPet.svelte';
  import { onMount } from 'svelte';

  const navigate = useNavigate();

  const handleDashViewToggle = () => {
    $dashView[0] === 'matches'
      ? ($dashView[0] = 'likes')
      : ($dashView[0] = 'matches');
  };

  const handleAddPet = () => {
    $dashView[1] = 'addPet';
  };

  onMount(() => {
    console.log('here', $animalLikes);
  });
</script>

<div class="main-container">
  <div class="grid-container">
    <div class="div1 glass">
      <div class="dash-headings">
        {#if $dashView[0] == 'matches'}
          <h1>Message Dashboard</h1>
        {:else}
          <h1>Animal Dashboard</h1>
        {/if}
        <Button
          text={$dashView[0] === 'matches' ? 'View Likes' : 'View Matches'}
          on:click={handleDashViewToggle}
        />
        {#if $dashView[0] == 'matches'}
          <h2>Matches</h2>
        {:else}
          <h2>Pending Likes</h2>
        {/if}
      </div>
      <div class="list-container">
        <SideListContainer />
      </div>
    </div>
    <div class="div2">
      <DashStats
        desc={'add pet'}
        stat={'+'}
        color={'red'}
        on:click={handleAddPet}
      />
    </div>
    <div class="div3">
      <DashStats
        desc={$userCredentials.animals && $userCredentials.animals.length === 1
          ? 'pet'
          : 'pets'}
        stat={$userCredentials.animals ? $userCredentials.animals.length : 0}
      />
    </div>
    <div class="div4">
      <DashStats desc={'animal likes'} stat={$animalLikes.length} />
    </div>
    <div class="div5">
      <DashStats desc={'matches'} stat={$shelterMatches.length} />
    </div>

    <div class="div6">
      {#if $dashView[1] === 'animalList'}
        <div class="mobile-btn-container">
          <h2>Animals</h2>
          <span class="btn"
            ><Button
              text={'Add animal'}
              on:click={() => {
                $dashView[1] = 'addPet';
              }}
            /></span
          >
        </div>
        <div class="list-container main">
          <ListCont />
        </div>
      {:else if $dashView[1] === 'animal'}
        <AnimalProfile />
      {:else if $dashView[1] === 'adopter'}
        <AdopterProfile />
      {:else if $dashView[1] === 'addPet'}
        <AddPet />
      {:else if $dashView[1] === 'mobileLikeMatchList'}
        <div class="mobile-btn-container">
          {#if $dashView[0] == 'matches'}
            <h2>Matches</h2>
          {:else}
            <h2>Pending Likes</h2>
          {/if}
          <span class="btn"
            ><Button
              text={$dashView[0] === 'matches' ? 'View Likes' : 'View Matches'}
              on:click={handleDashViewToggle}
            /></span
          >
        </div>
        <SideListContainer />
      {:else}
        <Chat />
      {/if}
    </div>
  </div>
</div>
<div class="mobile-nav">
  <div class="mobile-nav-item">
    <button type="text" on:click={() => ($dashView[1] = 'animalList')}
      >ANIMALS</button
    >
  </div>
  <div class="mobile-nav-item">
    <button type="text" on:click={() => ($dashView[1] = 'mobileLikeMatchList')}
      >LIKES/MATCHES</button
    >
  </div>
</div>

<style>
  .main-container {
    display: flex;
    height: 92vh;
    background-color: rgb(255, 255, 255, 0.1);
    background-blend-mode: lighten;
    background-repeat: no-repeat;
    background-position: 100% 80%, 50% 50%, 0% 100%;
    background-size: 60%, 80%, 60%;
    padding: 2rem;
  }

  .grid-container {
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(10, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    color: var(--black);
  }

  .mobile-nav {
    display: none;
  }

  h1 {
    margin: 1rem 0;
  }

  h2 {
    margin-top: 1rem;
    color: var(--red);
  }

  .grid-container > div:nth-last-child(1) {
    padding: 0rem;
  }

  .div1 {
    grid-area: 1 / 1 / 11 / 4;
    border-radius: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .mobile-btn-container {
    display: none;
  }

  .dash-headings {
    margin: 0 1rem;
  }

  .list-container {
    height: auto;
    width: 100%;
    overflow-y: auto;
    border-bottom: 1px solid var(--lightgrey);
    border-top: 1px solid var(--lightgrey);
  }

  .main {
    border-bottom: none;
    border-top: none;
  }

  .div2 {
    grid-area: 1 / 4 / 3 / 6;
  }
  .div3 {
    grid-area: 1 / 6 / 3 / 8;
  }
  .div4 {
    grid-area: 1 / 8 / 3 / 10;
  }
  .div5 {
    grid-area: 1 / 10 / 3 / 12;
  }
  .div6 {
    grid-area: 3 / 4 / 11 / 12;
    display: flex;
  }

  @media only screen and (max-width: 1280px) {
    .div2 {
      grid-area: 1 / 4 / 2 / 6;
    }
    .div3 {
      grid-area: 1 / 6 / 2 / 8;
    }
    .div4 {
      grid-area: 1 / 8 / 2 / 10;
    }
    .div5 {
      grid-area: 1 / 10 / 2 / 12;
    }
    .div6 {
      grid-area: 2 / 4 / 11 / 12;
    }
  }

  @media only screen and (max-width: 992px) {
    h1 {
      font-size: 1.2rem;
    }

    h2 {
      font-size: 1rem;
    }
  }

  @media only screen and (max-width: 688px) {
    h2 {
      margin-top: 0;
      font-size: 2rem;
      color: var(--black);
    }
    .mobile-btn-container {
      display: flex;
      margin: 1rem;
      justify-content: space-between;
    }

    .main-container {
      padding: 0rem;
      height: 85.5vh;
    }

    .grid-container {
      flex-grow: 1;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      color: var(--black);
    }

    .mobile-nav {
      height: 4rem;
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      gap: 1rem;
      background-color: var(--red);
    }

    .mobile-nav-item {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .mobile-nav-item button {
      display: block;
      background: none;
      height: 100%;
      width: 100%;
      color: var(--white);
      font-weight: 600;
    }

    .div1,
    .div2,
    .div3,
    .div4,
    .div5 {
      display: none;
    }

    .div6 {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding: 0.5rem;
      flex-direction: column;
    }
    .main {
      padding: 1rem;
    }

    .btn {
      display: flex;
      width: 150px;
    }
  }
</style>
