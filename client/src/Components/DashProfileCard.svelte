<script>
  import Button from './Button.svelte';
</script>

<div class="dash-profile-card glass">
  <h2>Dashboard</h2>
  <div class="profile-img" />
  <div class="details">
    <p>Name: Shelter123</p>
    <p>Email: 123@shelter.com</p>
    <p>Phone: 12345678</p>
  </div>
  <span><Button text="Edit profile" /></span>
</div>

<style>
  .dash-profile-card {
    height: 100%;
    border-radius: 30px;
    padding: 1rem;
    padding-top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .dash-profile-card > div {
    margin-top: 4rem;
  }

  .details {
    width: 70%;
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

  span {
    margin-top: 2rem;
    width: 80%;
  }
</style>
