<script lang="ts">
  import Time from 'svelte-time';
  import { Link, useNavigate } from 'svelte-navigator';
  import { dashView } from '../../Stores/dashView';
  import Button from '../Button.svelte';

  let username = 'user';
  let petName = 'pet';
  let message = 'this should be a message preview';
  let msgDate: Date = new Date();
</script>

{#if $dashView === 'msgs'}
  <Link to="/chat">
    <div class="list-item">
      <div class="img-container">
        <div class="dummy-img" />
      </div>
      <div class="msg-details">
        <p class="msg-username">{username}</p>
        <p class="msg-preview">{message}</p>
        <p class="msg-date"><Time timestamp={msgDate} relative /></p>
      </div>
    </div>
  </Link>
{:else}
  <div class="list-item">
    <div class="img-container">
      <span class="dummy-img" />
      <span class="dummy-img2" />
    </div>
    <div class="match-details">
      <p class="match-username">{username}</p>
      <p class="petName">{petName}</p>
      <p class="match-date"><Time timestamp={msgDate} relative /></p>
    </div>
    <span
      ><Button
        text={'view'}
        on:click={() => ($dashView = 'match')}
        padding={'0.5rem'}
      /></span
    >
  </div>
{/if}

<style>
  .list-item {
    width: 100%;
    /* border-radius: 30px; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 0.5px solid var(--lightgrey);
    position: relative;
    padding-right: 1rem;
    padding: 0.5rem 1rem 0.5rem 0;
  }

  .img-container {
    padding-right: 1rem;
    display: flex;
  }

  .dummy-img,
  .dummy-img2 {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    position: relative;
    background-color: var(--grey);
  }

  .dummy-img2 {
    left: -30px;
    background-color: var(--red);
    z-index: -2;
  }

  .msg-details,
  .match-details {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    padding: 0.5rem 0;
    position: relative;
    top: -3px;
  }

  .match-details {
    left: -30px;
  }

  .msg-username,
  .match-username {
    color: var(--red);
    font-size: 0.8rem;
  }

  .msg-date,
  .match-date {
    font-size: 0.6rem;
    color: var(--lavender);
  }
</style>
