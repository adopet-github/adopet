<script lang="ts">
  import { afterUpdate } from 'svelte';
  import img1 from '../assets/imgs/mockdog/1.jpg';
  import img2 from '../assets/imgs/mockdog/2.jpg';
  import img3 from '../assets/imgs/mockdog/3.jpg';
  import img4 from '../assets/imgs/mockdog/4.jpg';

  let group: HTMLDivElement;
  let information: HTMLDivElement;
  export let infoOpen;

  afterUpdate(() => {
    handleInfoClick();
  });

  const handleImageClick = (index: string) => {
    const card = document.getElementById(index);
    const parent = card.parentElement;
    const cards = parent.children as HTMLCollectionOf<HTMLElement>;
    for (let c of cards) {
      if (c === card) {
        c.style.zIndex = '3';
      } else {
        c.style.zIndex = '1';
      }
    }
  };

  const handleInfoClick = () => {
    if (infoOpen === false) {
      information.style.transform = 'scale(1) translateY(-50%)';
      group.style.left = '25%';
      group.classList.add('no-hover');
    } else {
      information.style.transform = 'scale(0)';
      group.style.left = '50%';
      group.classList.remove('no-hover');
    }
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
  />
</svelte:head>

<div class="group" bind:this={group}>
  <div class="card" on:mousedown={() => handleImageClick('three')} id="three">
    <img src={img1} alt="pet" />
    <div class="overlay"><i class="uil uil-map-marker" /> 7KM AWAY</div>
  </div>
  <div class="card" on:mousedown={() => handleImageClick('two')} id="two">
    <img src={img2} alt="pet" />
    <div class="overlay">5KG</div>
  </div>
  <div class="card" on:mousedown={() => handleImageClick('one')} id="one">
    <img src={img3} alt="pet" />
    <div class="overlay">2 YEARS OLD</div>
  </div>
  <div class="card" on:mousedown={() => handleImageClick('zero')} id="zero">
    <img src={img4} alt="pet" />
    <div class="overlay">BUSTER</div>
  </div>
</div>
<div class="information" bind:this={information}>
  <h1>Buster from Shelter123</h1>
  <hr />
  <div class="details">
    <h5><i class="uil uil-calender" /> 2 Years</h5>
    <h5><i class="uil uil-weight" /> 5 KG</h5>
    <h5><i class="uil uil-map-marker" /> 17 KM</h5>
  </div>
  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque nesciunt,
    ea suscipit velit dolorem sunt ipsam molestiae, odit excepturi pariatur nemo
    earum possimus voluptatum officia porro in aut corrupti beatae sapiente
    perspiciatis assumenda voluptatibus voluptates fugiat! Nostrum, quidem
    repellendus aliquid ut doloremque molestias culpa officia asperiores
    assumenda quasi a excepturi.
  </p>
</div>

<style>
  .group {
    top: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) !important;
    transition: left 300ms cubic-bezier(0.16, 0.89, 0.61, 0.99);
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
    padding-top: 60px;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
    z-index: 1;
    border-radius: inherit;
    display: flex;
    align-items: flex-end;
    padding: 1rem;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .card {
    border-radius: 1rem;
    position: absolute;
    transition: transform 800ms cubic-bezier(0.05, 0.43, 0.25, 0.95);
    display: flex;
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

  .information {
    position: absolute;
    top: 50%;
    border-radius: 1rem;
    height: 420px;
    aspect-ratio: 1;
    padding: 1rem;
    right: 12.5%;
    transform: scale(0);
    transition: transform 300ms cubic-bezier(0.05, 0.43, 0.25, 0.95);
    -webkit-box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
  }

  .information h1 {
    font-size: 1.3rem;
    text-align: center;
  }

  hr {
    width: 50%;
    margin: 0.5rem auto;
  }

  .details {
    display: flex;
    justify-content: space-around;
    width: 100%;
    align-items: center;
    margin-bottom: 1rem;
  }

  .information p {
    text-align: justify;
    flex: 1;
    display: flex;
    align-items: center;
    margin: 1rem;
  }

  @media screen and (max-width: 1000px) {
    .information {
      right: 5%;
    }
  }

  @media screen and (max-width: 880px) {
    .information {
      width: 350px;
    }
  }

  @media screen and (max-width: 800px) {
    /* CHANGE LAYOUT */
  }
</style>
