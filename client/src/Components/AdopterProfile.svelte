<script lang="ts">
  import CloseButton from './CloseButton.svelte';
  import Button from './Button.svelte';
  import { viewAdopterProfile } from '../Stores/viewAdopterProfile';
  import { acceptLike, rejectLike } from '../Services/animal';
  import { animalLikes } from '../Stores/animalLikes';
  import { dashView } from '../Stores/dashView';
  import ProfilePic from './ProfilePic.svelte';
  import { shelterMatches } from '../Stores/shelterMatches';
  import { viewMatchChat } from '../Stores/viewMatchChat';

  let animal = $viewAdopterProfile.animal;
  let adopter = $viewAdopterProfile.adopter;
  let date = new Date();
  let match = { adopter, animal, date };

  const handleAcceptLike = async () => {
    const res = await acceptLike(
      $viewAdopterProfile.animal.id,
      $viewAdopterProfile.adopter.id
    );
    if (res.status === 200) {
      animalLikes.update((prev) => {
        return prev.filter(
          (obj) =>
            !(
              obj.adopter.id === $viewAdopterProfile.adopter.id &&
              obj.animal.id === $viewAdopterProfile.animal.id
            )
        );
      });
      const animal = { ...$viewAdopterProfile.animal };
      const adopter = { ...$viewAdopterProfile.adopter };
      const newMatch = {
        adopter,
        animal
      };
      shelterMatches.update((prev) => [...prev, newMatch]);
    }
    dashView.set(['matches', 'chat']);
    viewMatchChat.set(match);
  };

  const handleRejectLike = async () => {
    const res = await rejectLike(
      $viewAdopterProfile.animal.id,
      $viewAdopterProfile.adopter.id
    );
    if (res.status === 200) {
      animalLikes.update((prev) => {
        console.log(prev);
        return prev.filter(
          (obj) =>
            !(
              obj.adopter.id === $viewAdopterProfile.adopter.id &&
              obj.animal.id === $viewAdopterProfile.animal.id
            )
        );
      });
    }
    dashView.set(['likes', 'animalList']);
  };
</script>

<div class="card glass glass1">
  {#if $viewAdopterProfile.animal}
    <div class="pet-match-banner">
      <p>
        Interested in: <span>{$viewAdopterProfile.animal.name}</span>
      </p>
    </div>
    <span
      ><CloseButton
        sideCloseTo={window.innerWidth > 688 ? 'likes' : ''}
        closeTo={window.innerWidth > 688 ? 'animalList' : 'mobileLikeMatchList'}
      /></span
    >
  {:else}
    <CloseButton text={'back'} closeTo={'chat'} />
  {/if}
  <div class="heading-cont">
    <h2>
      {$viewAdopterProfile.adopter.first_name}
      {$viewAdopterProfile.adopter.last_name}
    </h2>
    <p>{$viewAdopterProfile.adopter.address}</p>
  </div>
  <div class="imgs-cont">
    {#if $viewAdopterProfile.adopter.images.length}
      {#each $viewAdopterProfile.adopter.images as image}
        <div class="img"><img src={image.url} alt={image.caption} /></div>
      {/each}
    {:else}
      <div class="no-images">
        <div class="no-img"><ProfilePic img={''} /></div>
        <p>
          {$viewAdopterProfile.adopter.first_name} doesn't have any photos yet...
        </p>
      </div>
    {/if}
  </div>
  <div class="stat-cont">
    <div class="description">
      <p>{$viewAdopterProfile.adopter.description}</p>
    </div>
    <div class="pets-cont">
      <p>🎂 <span>{$viewAdopterProfile.adopter.age}</span> years old</p>
      <p>
        {$viewAdopterProfile.adopter.has_pets ? '✅ Has pets' : `❌ No pets`}
      </p>
      <p>
        {$viewAdopterProfile.adopter.has_children
          ? '✅ Has children'
          : `❌ No children`}
      </p>
      <p>
        🕐 Home <span>~{$viewAdopterProfile.adopter.time_at_home}</span>hrs a
        day
      </p>
      <p>
        🏠 Lives in {$viewAdopterProfile.adopter.house_type === 'apartment'
          ? 'an'
          : 'a'}
        <span>{$viewAdopterProfile.adopter.house_type}</span>
      </p>
    </div>
  </div>
  {#if $viewAdopterProfile.animal}
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

  h2,
  p {
    color: var(--lavender);
  }

  .heading-cont {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .imgs-cont {
    max-width: 80%;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .no-images {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .no-images p {
    font-size: 0.8rem;
    color: var(--lavender);
  }

  .no-img {
    width: 150px;
    height: 150px;
    border-radius: 20px;
  }

  .stat-cont {
    display: flex;
    width: 80%;
    align-items: flex-start;
    color: var(--lavender);
    justify-content: space-between;
    gap: 1rem;
  }
  .btns-cont {
    display: flex;
    width: 50%;
    justify-content: space-between;
    gap: 1rem;
  }
  .description {
    max-width: 50%;
  }

  p span {
    font-weight: 900;
    color: var(--red);
  }

  .img {
    border-radius: 1rem;
  }

  img {
    max-height: 10rem;
    max-width: 100%;
    object-fit: cover;
    border-radius: inherit;
    aspect-ratio: 1;
  }

  @media only screen and (max-height: 750px) {
    .imgs-cont {
      max-width: 80%;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      max-height: 10rem;
      max-width: 80%;
      object-fit: cover;
      border-radius: inherit;
      aspect-ratio: 1;
    }
  }

  @media only screen and (max-width: 688px) {
    .card {
      border-radius: 0px;
    }
  }
</style>
