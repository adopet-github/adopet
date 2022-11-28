<script lang="ts">
  import Button from '../Components/Button.svelte';
</script>

<div class="container glass">
  <p
    style="color: var(--red);
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;"
  >
    close
  </p>
  <h2>Add Pet</h2>
  <div class="profile-img" />
  <p style="color: var(--red); cursor: pointer">upload images</p>
  <div class="details">
    <label for="pet-name">Pet name:</label>
    <input id="pet-name" label="pet name" placeholder="Rex" type="text" />
    <div class="ageWeightCont">
      <div
        style="display: flex;
      align-items: center;"
      >
        <label for="weight">Weight (kg):</label>
        <input id="weight" label="weight" placeholder="10" type="number" />
      </div>
      <div
        style="display: flex;
      align-items: center;
      text-align: end;"
      >
        <label for="weight">Age:</label>
        <input id="age" label="age" placeholder="10" type="number" />
      </div>
    </div>
    <span><Button text="add pet" /></span>
  </div>
</div>

<style>
  .container {
    height: 80vh;
    position: relative;
    width: 50%;
    border-radius: 20px;
    margin: auto;
    margin-top: 4rem;
    padding: 1rem;
    padding-top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--black);
  }

  .container > div {
    margin-top: 2rem;
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 40%;
  }

  .ageWeightCont {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  .profile-img {
    height: 200px;
    width: 200px;
    background-color: var(--grey);
    border-radius: 100px;
  }

  h2 {
    color: var(--red);
    font-size: 2rem;
    padding: 0.5rem;
    font-weight: 900;
  }

  input {
    padding: 1rem;
    border-radius: 20px;
    margin: 1rem 0;
    width: 100%;
    font-size: 1.2rem;
  }

  label {
    font-size: 1.2rem;
    width: 100%;
  }

  #weight,
  #age {
    width: 100%;
  }

  .ageWeightCont label {
    margin: 0 1rem;
  }

  .ageWeightCont label:first-child {
    margin: 0 1rem 0 0;
  }

  span {
    width: 100%;
    margin-top: 2rem;
  }
</style>
