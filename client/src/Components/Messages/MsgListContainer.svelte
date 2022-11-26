<script lang="ts">
  import MsgListItem from './MsgListItem.svelte';
</script>

<div class="message-list">
  <h2>Messages</h2>
  <MsgListItem />
  <MsgListItem />
  <MsgListItem />
  <MsgListItem />
  <MsgListItem />
  <MsgListItem />
  <MsgListItem />
  <MsgListItem />
  <MsgListItem />
</div>

<style>
  .message-list {
    max-height: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: scroll;
  }

  h2 {
    align-self: flex-start;
    color: var(--red);
  }
</style>
