<script lang="ts">
  import CloseButton from './CloseButton.svelte';
  import Button from './Button.svelte';

  let animalName: string = 'Jake';
  let description: string =
    'Jake is nearly 5 years old and is a mixed breed, weighing 30kgs and 100 percent love! We are looking for people who feel comfortable with big, high energy dogs and love going on walks.';
  let age: number = 5;
  let weight: number = 30;
</script>

<div class="card glass glass1">
  <CloseButton />
  <div class="heading-cont">
    <h1>{animalName}</h1>
    <span><Button text={'edit'} /></span>
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
    <div class="stats">
      <div class="age-cont"><p>🎂 <span>{age}</span> years old</p></div>
      <div class="weight-cont"><p>⚖️ <span>{weight}</span> kg</p></div>
    </div>
  </div>
  <div class="enquiries">
    <h2>Current enquiries</h2>
    <p>List of people here</p>
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
    align-items: center;
    gap: 1rem;
  }

  .imgs-cont {
    display: flex;
    justify-content: space-between;
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
    width: 100%;
    align-items: flex-start;
    justify-content: space-around;
    color: var(--lavender);
  }

  .stats span {
    color: var(--red);
    font-weight: 900;
  }
  .description {
    width: 50%;
  }
</style>
