<script lang="ts">
  import img1 from '../assets/imgs/mockdog/1.jpg';
  import img2 from '../assets/imgs/mockdog/2.jpg';
  import img3 from '../assets/imgs/mockdog/3.jpg';
  import img4 from '../assets/imgs/mockdog/4.jpg';

  const handleImageClick = (index: string) => {
    const card = document.getElementById(index);
    const parent = card.parentElement;
    const cards = parent.children as HTMLCollectionOf<HTMLElement>;
    console.log(cards);
    for (let c of cards) {
      if (c === card) {
        c.style.zIndex = '3';
      } else {
        c.style.zIndex = '1';
      }
    }
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
  />
</svelte:head>

<div class="container">
  <div class="group">
    <div class="card" on:mousedown={() => handleImageClick('three')} id="three">
      <img src={img1} alt="pet" />
      <div class="overlay" />
    </div>
    <div class="card" on:mousedown={() => handleImageClick('two')} id="two">
      <img src={img2} alt="pet" />
      <div class="overlay" />
    </div>
    <div class="card" on:mousedown={() => handleImageClick('one')} id="one">
      <img src={img3} alt="pet" />
      <div class="overlay" />
    </div>
    <div class="card" on:mousedown={() => handleImageClick('zero')} id="zero">
      <img src={img4} alt="pet" />
      <div class="overlay" />
    </div>
  </div>
  <div class="buttons">
    <button class="no">
      <i class="uil uil-times" />
    </button>
    <button class="yes">
      <i class="uil uil-heart" />
    </button>
  </div>
</div>

<style>
  .container {
    color: black;
    background: rgb(235, 224, 224);
    background: linear-gradient(
      45deg,
      rgba(235, 224, 224, 1) 0%,
      rgba(255, 242, 237, 1) 100%
    );
    height: 92vh;
    display: grid;
    place-items: center;
  }

  .group,
  .card {
    width: 300px;
    aspect-ratio: 5 / 7;
    transform: translateY(10%);
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: inherit;
    transition: transform 500ms cubic-bezier(0.5, 0.61, 0.25, 1);
    -webkit-box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.3);
  }

  .overlay {
    position: absolute;
    /* padding-top: 60px; */
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
    z-index: 1;
    border-radius: inherit;
  }

  .card {
    border-radius: 1rem;
    position: absolute;
    transition: transform 800ms cubic-bezier(0.05, 0.43, 0.25, 0.95);
    display: flex;
  }

  .card:hover {
    transform: translateY(-10%);
  }

  .card:nth-child(1) {
    transform: translateX(-10%) rotate(-1deg);
  }

  .card:nth-child(2) {
    transform: rotate(2deg);
  }

  .card:nth-child(3) {
    transform: translateX(-6%) rotate(-3deg);
  }

  .card:nth-child(4) {
    transform: translate(10%, 3%) rotate(5deg);
  }

  .group:hover > .card:nth-child(1) {
    transform: translate(-75%, 16%) rotate(-24deg);
  }

  .group:hover > .card:nth-child(2) {
    transform: translate(-25%, 8%) rotate(-8deg);
  }

  .group:hover > .card:nth-child(3) {
    transform: translate(25%, 8%) rotate(8deg);
  }

  .group:hover > .card:nth-child(4) {
    transform: translate(75%, 16%) rotate(24deg);
  }

  .buttons {
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
  }

  button {
    background: none;
    font-size: 3rem;
    aspect-ratio: 1;
    width: 80px;
    border-radius: 50%;
  }

  .yes {
    border: solid 4px rgb(33, 150, 243);
    color: rgb(33, 150, 243);
  }

  .yes:hover {
    -webkit-box-shadow: 0px 0px 10px 5px rgba(32, 150, 243, 0.3);
    -moz-box-shadow: 0px 0px 10px 5px rgba(32, 150, 243, 0.3);
    box-shadow: 0px 0px 10px 5px rgba(32, 150, 243, 0.3);
  }

  .no {
    border: solid 4px var(--red);
    color: var(--red);
  }

  .no:hover {
    -webkit-box-shadow: 0px 0px 10px 5px rgba(211, 62, 67, 0.3);
    -moz-box-shadow: 0px 0px 10px 5px rgba(211, 62, 67, 0.3);
    box-shadow: 0px 0px 10px 5px rgba(211, 62, 67, 0.3);
  }
</style>
