<script>
  import ListItem from './ListItem.svelte';
</script>

<div class="list-container">
  <p style="padding-left: 1rem; color: blue">This is list-container</p>
  <ListItem />
  <ListItem />
  <ListItem />
  <ListItem />
  <ListItem />
  <ListItem />
  <ListItem />
  <ListItem />
</div>

<style>
  .list-container {
    height: 100%;
    border-radius: 30px;
    overflow-y: scroll;
  }
</style>
