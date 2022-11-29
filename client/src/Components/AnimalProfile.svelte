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
    <h2>{animalName}</h2>
    <span><Button text={'edit'} /></span>
  </div>
  <div class="stat-cont">
    <div class="age-cont"><p>Age: {age}</p></div>
    <div class="weight-cont"><p>Weight: {weight}kg</p></div>
  </div>
  <div class="imgs-cont">
    <div class="dummy-img" />
    <div class="dummy-img" />
    <div class="dummy-img" />
    <div class="dummy-img" />
    <div class="dummy-img" />
  </div>
  <div class="description">
    <p>{description}</p>
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
    gap: 1rem;
    overflow-x: auto;
    width: 90%;
  }
  .dummy-img {
    min-height: 15rem;
    min-width: 15rem;
    background-color: var(--grey);
    border-radius: 20px;
  }
  .stat-cont {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    color: var(--red);
  }
  .description {
    width: 90%;
  }
</style>
