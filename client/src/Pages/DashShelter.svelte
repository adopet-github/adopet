<script>
  import BackgroundAnimation from '../Components/BackgroundAnimation.svelte';
  import DashProfileCard from '../Components/DashProfileCard.svelte';
  import DashStats from '../Components/DashStats.svelte';
  import ListCont from '../Components/ListCont.svelte';
  import MsgListCont from '../Components/Messages/MsgListCont.svelte';
</script>

<div class="main-container">
  <div class="grid-container">
    <div class="div1">
      <MsgListCont />
    </div>
    <div class="div2">
      <DashStats desc={'add pet'} stat={'+'} color={'red'} />
    </div>
    <div class="div3"><DashStats desc={'pets'} stat={'10'} /></div>
    <div class="div4"><DashStats desc={'open enquiries'} stat={'4'} /></div>
    <div class="div5"><DashStats desc={'most popular'} stat={'Rex'} /></div>
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

  .grid-container {
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(10, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    color: var(--black);
  }

  .grid-container > div:nth-last-child(1) {
    padding: 0rem;
  }

  .div1 {
    grid-area: 1 / 1 / 11 / 4;
  }
  .div2 {
    grid-area: 1 / 4 / 3 / 6;
  }
  .div3 {
    grid-area: 1 / 6 / 3 / 8;
  }
  .div4 {
    grid-area: 1 / 8 / 3 / 10;
  }
  .div5 {
    grid-area: 1 / 10 / 3 / 12;
  }
  .div6 {
    grid-area: 3 / 4 / 11 / 12;
  }
</style>
