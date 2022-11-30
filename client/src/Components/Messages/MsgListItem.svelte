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
  <button>
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
  </button>
{:else}
  <button on:click={() => ($dashView = 'match')}>
    <div class="list-item">
      <span class="dummy-img" />
      <div class="match-details">
        <p class="match-username">{username}</p>
        <p class="petName">{petName}</p>
        <p class="match-date"><Time timestamp={msgDate} relative /></p>
      </div>
      <span class="dummy-img2" />
    </div>
  </button>
{/if}

<style>
  button {
    background: none;
  }
  .list-item {
    width: 100%;
    /* border-radius: 30px; */
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 0.5px solid var(--lightgrey);
    position: relative;
    padding: 0.5rem 1rem;
    gap: 1rem;
  }

  .list-item:hover {
    background-color: rgba(0, 0, 0, 0.2);
    mix-blend-mode: multiply;
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
    background-color: var(--red);
  }

  .msg-details,
  .match-details {
    padding: 0.5rem 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
  }

  .msg-username,
  .match-username {
    color: var(--red);
    font-size: 0.8rem;
  }

  .msg-preview,
  .petName {
    font-size: 1rem;
    text-align: left;
  }

  .petName {
    font-size: 1.2rem;
  }

  .msg-date,
  .match-date {
    font-size: 0.6rem;
    color: var(--lavender);
  }

  @media only screen and (max-width: 992px) {
    p {
      font-size: 0.8rem;
    }
    .dummy-img,
    .dummy-img2 {
      height: 30px;
      width: 30px;
      border-radius: 20px;
    }

    .msg-username,
    .match-username {
      color: var(--red);
      font-size: 0.8rem;
    }

    .msg-date,
    .match-date {
      font-size: 0.5rem;
      color: var(--lavender);
    }
  }
</style>
