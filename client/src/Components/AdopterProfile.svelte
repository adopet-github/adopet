<script lang="ts">
  import CloseButton from './CloseButton.svelte';
  import Button from './Button.svelte';
  import { viewAdopterProfile } from '../Stores/viewAdopterProfile';
  import { acceptLike, rejectLike } from '../Services/animal';
  import { animalLikes } from '../Stores/animalLikes';
  import { dashView } from '../Stores/dashView';

  const handleAcceptLike = async () => {
    const res = await acceptLike(
      $viewAdopterProfile.adopter_animal.id,
      $viewAdopterProfile.id
    );
    if (res.status === 200) {
      animalLikes.update((prev) => {
        return prev.filter(
          (obj) =>
            obj.adopter.id !== $viewAdopterProfile.id &&
            obj.animal.id !== $viewAdopterProfile.adopter_animal.id
        );
      });
    }
    dashView.set(['likes', 'allAnimals']);
  };

  const handleRejectLike = async () => {
    const res = await rejectLike(
      $viewAdopterProfile.adopter_animal.id,
      $viewAdopterProfile.id
    );
    if (res.status === 200) {
      animalLikes.update((prev) => {
        return prev.filter(
          (obj) =>
            obj.adopter.id !== $viewAdopterProfile.id &&
            obj.animal.id !== $viewAdopterProfile.adopter_animal.id
        );
      });
    }
    dashView.set(['likes', 'allAnimals']);
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
  />
</svelte:head>

<div class="card glass glass1">
  {#if $viewAdopterProfile.adopter_animal}
    <div class="pet-match-banner">
      <p>
        Interested in: <span>{$viewAdopterProfile.adopter_animal.name}</span>
      </p>
    </div>
    <CloseButton closeTo={'animalList'} />
  {/if}
  <CloseButton closeTo={'chat'} />
  <div class="heading-cont">
    <h2>{$viewAdopterProfile.first_name} {$viewAdopterProfile.last_name}</h2>
    <p>{$viewAdopterProfile.address}</p>
  </div>
  <div class="imgs-cont">
    {#if $viewAdopterProfile.images.length}
      {#each $viewAdopterProfile.images as image}
        <img class="img" src={image.url} alt={image.caption} />
      {/each}
    {:else}
      <div class="no-images">
        <i class="uil uil-user-circle" />
      </div>
      <p>{$viewAdopterProfile.first_name} doesn't have any photos yet...</p>
    {/if}
  </div>
  <div class="stat-cont">
    <div class="description">
      <p>{$viewAdopterProfile.description}</p>
    </div>
    <div class="pets-cont">
      <p>🎂 <span>{$viewAdopterProfile.age}</span> years old</p>
      <p>{$viewAdopterProfile.has_pets ? '✅ Has pets' : `❌ No pets`}</p>
      <p>
        {$viewAdopterProfile.has_children
          ? '✅ Has children'
          : `❌ No children`}
      </p>
      <p>
        🕐 At home <span>~{$viewAdopterProfile.time_at_home}</span> hours a day
      </p>
      <p>
        🏠 Lives in {$viewAdopterProfile.house_type === 'apartment'
          ? 'an'
          : 'a'}
        <span>{$viewAdopterProfile.house_type}</span>
      </p>
    </div>
  </div>
  {#if $viewAdopterProfile.adopter_animal}
    <div class="btns-cont">
      <Button text={'accept'} on:click={handleAcceptLike} />
      <Button text={'decline'} colour={'white'} on:click={handleRejectLike} />
    </div>
  {/if}
</div>

<style>
  .card {
    height: 100%;
    position: relative;
    width: 100%;
    border-radius: 20px;
    padding: 1rem;
    padding-bottom: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: var(--black);
    gap: 1rem;
    overflow: hidden;
  }

  .heading-cont {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .imgs-cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    overflow-x: auto;
    width: 80%;
    color: #9897a0;
  }
  .img,
  .no-images {
    height: 10rem;
    width: 10rem;
    background-color: var(--grey);
    border-radius: 20px;
    display: grid;
    place-items: center;
  }

  .no-images i {
    color: white;
    font-size: 7.5rem;
  }
  .stat-cont {
    display: flex;
    width: 80%;
    align-items: flex-start;
    color: var(--lavender);
    justify-content: space-between;
  }
  .btns-cont {
    display: flex;
    width: 50%;
    justify-content: space-between;
    gap: 1rem;
  }
  .description {
    max-width: 20rem;
  }

  p span {
    font-weight: 900;
    color: var(--red);
  }
</style>
