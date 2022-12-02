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
  import { onMount } from 'svelte';
  import { getShelterMatches } from '../Services/shelter';

  const navigate = useNavigate();

  const handleDashViewToggle = () => {
    $dashView === 'allAnimals'
      ? ($dashView = 'msgs')
      : ($dashView = 'allAnimals');
    $dashView === 'oneAnimal' ? ($dashView = 'allAnimals') : null;
  };

  const handleAddPet = () => {
    navigate('/shelter/addpet');
  };

  let matches = [];

  onMount(async () => {
    const res = await getShelterMatches($userCredentials.id);
    if (res.status === 200) {
      matches = res.data;
    }
  });
</script>

<div class="main-container">
  <div class="grid-container">
    <div class="div1 glass">
      <div class="dash-headings">
        {#if $dashView == 'msgs'}
          <h1>Message Dashboard</h1>
        {:else}
          <h1>Animal Dashboard</h1>
        {/if}
        <Button
          text={$dashView === 'allAnimals' ? 'View messages' : 'View animals'}
          on:click={handleDashViewToggle}
        />
        {#if $dashView == 'msgs'}
          <h2>Matches</h2>
        {:else}
          <h2>Likes</h2>
        {/if}
      </div>
      <div class="list-container">
        <SideListContainer {matches} />
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
    <div class="div5"><DashStats desc={'matches'} stat={matches.length} /></div>
    <div class="div6">
      {#if $dashView === 'allAnimals'}
        <ListCont />
      {:else if $dashView === 'oneAnimal'}
        <AnimalProfile />
      {:else if $dashView === 'match'}
        <AdopterProfile />
      {:else}
        <Chat />
      {/if}
    </div>
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

  .dash-headings {
    margin: 0 1rem;
  }

  .list-container {
    height: auto;
    overflow-y: auto;
    /* margin-bottom: 8%; */
    border-bottom: 1px solid var(--lightgrey);
    border-top: 1px solid var(--lightgrey);
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
</style>
