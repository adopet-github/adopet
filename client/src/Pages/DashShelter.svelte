<script>
  import ListCont from '../Components/ListCont.svelte';
</script>

<div class="main-container">
  <div class="grid-container">
    <div class="glass dashboard div1">
      <h2>Dashboard</h2>
      <p>hey</p>
    </div>
    <div class="glass grid-tab div2"><p>hey</p></div>
    <div class="glass grid-tab div3"><p>hey</p></div>
    <div class="glass grid-tab div4"><p>hey</p></div>
    <div class="glass grid-tab div5"><p>hey</p></div>
    <div class="div6"><ListCont /></div>
  </div>
</div>

<style>
  .main-container {
    display: flex;
    height: 92vh;
    background-color: rgb(255, 255, 255, 0.1);
    /* background-image: url('../assets/SVGs/red_blob_grad.svg'),
      url('../assets/SVGs/cream_blob_grad.svg'),
      url('../assets/SVGs/grey_blob_grad.svg'); */

    background-blend-mode: lighten;
    background-repeat: no-repeat;
    background-position: 100% 80%, 50% 50%, 0% 100%;
    background-size: 60%, 80%, 60%;
    padding: 2rem;
  }

  h2 {
    color: var(--red);
    padding: 0.5rem;
  }
  .grid-container {
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    color: black;
  }

  .grid-container > div {
    border-radius: 30px;
    padding: 2rem;
  }

  .grid-container > div:nth-last-child(1) {
    padding: 0rem;
  }

  .div1 {
    grid-area: 1 / 1 / 6 / 3;
  }
  .div2 {
    grid-area: 1 / 3 / 2 / 4;
  }
  .div3 {
    grid-area: 1 / 4 / 2 / 5;
  }
  .div4 {
    grid-area: 1 / 5 / 2 / 6;
  }
  .div5 {
    grid-area: 1 / 6 / 2 / 7;
  }
  .div6 {
    grid-area: 2 / 3 / 6 / 7;
    padding: 0rem;
  }
</style>
