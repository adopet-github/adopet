<script lang="ts"></script>

<div class="list-item glass">
  <div class="img-container">
    <div class="dummy-img" />
  </div>
  <div class="msg-details">
    <p class="msg-username">username</p>
    <p class="msg-preview">last message</p>
    <p class="msg-date">last message date</p>
  </div>
</div>

<style>
  .list-item {
    width: 100%;
    margin-top: 1rem;
    border-radius: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .dummy-img {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    margin: 1rem;
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
