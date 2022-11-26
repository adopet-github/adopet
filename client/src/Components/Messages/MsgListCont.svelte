<script lang="ts">
  import MsgListItem from './MsgListItem.svelte';
</script>

<div class="message-list">
  <h2>Message List</h2>
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
    height: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: scroll;
  }
</style>
