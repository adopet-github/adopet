<script lang="ts">
  import CloseButton from './CloseButton.svelte';
  import Button from './Button.svelte';

  let adopterName: string = 'Adopter Name';
  let adopterAddress: string = 'Sample address, Sample City';
  let description: string =
    'Adopter bio goes here, it should be quite long and take up a few lines and talk about how much they love pets and are the perfect candidate to adopt one of the animals';
  let age: number = 25;
  let hasPets: boolean = true;
  let hasChildren: boolean = false;
  let hoursHome: number = 10;
  let houseType: string = 'apartment';
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
  />
</svelte:head>

<div class="card glass glass1">
  <div class="pet-match-banner">
    <p>Interested in: <span>pet name here</span></p>
  </div>
  <CloseButton />
  <div class="heading-cont">
    <h2>{adopterName}</h2>
    <p>{adopterAddress}</p>
  </div>
  <div class="imgs-cont">
    <div class="dummy-img" />
    <div class="dummy-img" />
    <div class="dummy-img" />
    <div class="dummy-img" />
  </div>
  <div class="stat-cont">
    <div class="description">
      <p>{description}</p>
    </div>
    <div class="pets-cont">
      <p>🎂 <span>{age}</span> years old</p>
      <p>{hasPets ? '✅ Has pets' : `❌ No pets`}</p>
      <p>{hasChildren ? '✅ Has children' : `❌ No children`}</p>
      <p>🕐 At home <span>~{hoursHome}</span> hours a day</p>
      <p>
        🏠 Lives in {houseType === 'apartment' ? 'an' : 'a'}
        <span>{houseType}</span>
      </p>
    </div>
  </div>
  <div class="btns-cont">
    <Button text={'accept'} />
    <Button text={'message'} colour={'white'} />
    <Button text={'decline'} colour={'white'} />
  </div>
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
  }
  .dummy-img {
    min-height: 10rem;
    min-width: 10rem;
    background-color: var(--grey);
    border-radius: 20px;
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
