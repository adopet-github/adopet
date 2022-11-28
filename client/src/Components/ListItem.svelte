<script lang="ts">
  import Button from './Button.svelte';
</script>

<div class="list-item glass">
  <div class="img-container">
    <div class="dummy-img" />
  </div>
  <p>pet name</p>
  <p>type</p>
  <p>enquiries</p>
  <div class="btns-container">
    <span><Button text="view" /></span>
    <span><Button text="X" /></span>
  </div>
</div>

<style>
  .list-item {
    width: 100%;
    padding: 1rem 3rem;
    margin-bottom: 1rem;
    border-radius: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dummy-img {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    background-color: var(--grey);
  }

  .btns-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btns-container > span {
    margin-left: 10px;
  }
</style>
