<script lang="ts">
  import Time from 'svelte-time';
  import { Link, useNavigate } from 'svelte-navigator';

  let username = 'user';
  let message = 'this should be a message preview';
  let msgDate: Date = new Date();
</script>

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

<style>
  .list-item {
    width: 100%;
    /* border-radius: 30px; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 0.5px solid var(--lightgrey);
  }

  .dummy-img {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    margin: 1rem;
    margin-left: 0;
    background-color: var(--grey);
  }

  .msg-details {
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

  .msg-username {
    color: var(--red);
    font-size: 0.8rem;
  }

  .msg-date {
    font-size: 0.6rem;
    color: var(--lavender);
  }
</style>
