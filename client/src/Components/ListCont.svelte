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
  <ListItem />
  <ListItem />
  <ListItem />
</div>

<style>
  .list-container {
    display: grid;
    grid-auto-flow: row;
    height: 100%;
    overflow-y: scroll;
    padding-right: 1rem;
  }
</style>
