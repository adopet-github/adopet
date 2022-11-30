<script lang="ts">
  import MsgListItem from './MsgListItem.svelte';
</script>

<div class="message-list">
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
</style>
