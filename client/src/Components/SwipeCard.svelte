<script lang="ts">
  import { afterUpdate, onMount } from 'svelte';

  let group: HTMLDivElement;
  let information: HTMLDivElement;
  export let infoOpen;

  export let index: number;
  export let activeIndex;

  export let animal;

  onMount(() => {
    if (index === 0) {
      group.setAttribute('data-status', 'active');
    } else {
      group.setAttribute('data-status', 'unknown');
    }
  });

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

  const handleInfoClick = async () => {
    if (window.innerWidth > 900) {
      if (!infoOpen && index === activeIndex) {
        information.style.transform = 'scale(1) translateY(-50%)';
        group.style.transform = 'translateX(-90%)';
        if (window.innerWidth < 1400) {
          group.classList.add('no-hover');
        }
      } else {
        information.style.transform = 'scale(0)';
        group.style.transform = 'translateX(0%)';
        group.classList.remove('no-hover');
      }
    } else if (window.innerWidth > 650) {
      if (!infoOpen && index === activeIndex) {
        information.style.transform = 'scale(1) translateX(0%)';
        group.style.transform = 'translateY(-35%)';
      } else {
        information.style.transform = 'scale(0)';
        group.style.transform = 'translateX(0%)';
      }
    } else {
      if (!infoOpen && index === activeIndex) {
        let scale: number;
        if (window.innerWidth > 500) scale = 0.65;
        else if (window.innerWidth > 410) scale = 0.55;
        else scale = 0.5;
        const children = group.children as HTMLCollection;
        (
          children[0] as HTMLElement
        ).style.transform = `scale(${scale}) translate(80%, -40%) rotate(7deg)`;
        (
          children[1] as HTMLElement
        ).style.transform = `scale(${scale}) translate(40%, -90%) rotate(-5deg)`;
        (
          children[2] as HTMLElement
        ).style.transform = `scale(${scale}) translate(-40%, -40%) rotate(8deg)`;
        (
          children[3] as HTMLElement
        ).style.transform = `scale(${scale}) translate(-90%, -80%) rotate(-10deg)`;

        information.style.transform = 'scale(1) translateX(0%) translateY(-5%)';
      } else {
        information.style.transform = 'scale(0)';
        for (let i = 0; i < group.children.length; i++) {
          const card = group.children[i] as HTMLElement;
          card.style.transform = 'scale(1)';
        }
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

<div class="group" bind:this={group} id={animal.id} data-index={index}>
  <div class="card" on:mousedown={() => handleImageClick('three')} id="three">
    <img src={animal.images[0].url} alt="animal" />
    <div class="overlay">
      <i class="uil uil-map-marker" />
      {animal.distance} KM AWAY
    </div>
  </div>
  <div class="card" on:mousedown={() => handleImageClick('two')} id="two">
    <img src={animal.images[1].url} alt="animal" />
    <div class="overlay">{animal.weight} KG</div>
  </div>
  <div class="card" on:mousedown={() => handleImageClick('one')} id="one">
    <img src={animal.images[2].url} alt="animal" />
    <div class="overlay">{animal.age} YEARS OLD</div>
  </div>
  <div class="card" on:mousedown={() => handleImageClick('zero')} id="zero">
    <img src={animal.images[3].url} alt="animal" />
    <div class="overlay">{animal.name}</div>
  </div>
</div>
<div class="information" bind:this={information}>
  <h1>{animal.name} from {animal.shelterName}</h1>
  <hr />
  <div class="details">
    <h5><i class="uil uil-calender" /> {animal.age} Years</h5>
    <h5><i class="uil uil-weight" /> {animal.weight} KG</h5>
    <h5><i class="uil uil-map-marker" /> {animal.distance} KM</h5>
  </div>
  <p>
    Pet: {animal.description}
  </p>
  <p>Shelter: {animal.shelterDescription}</p>
</div>

<style>
  .group {
    position: absolute;
    transition: transform 400ms cubic-bezier(0.16, 0.89, 0.61, 0.99);
  }

  .group,
  .card {
    width: 300px;
    aspect-ratio: 5 / 7;
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

  @media only screen and (max-width: 900px) {
    .information {
      height: 250px;
      min-width: 90%;
      max-width: 100%;
      top: 60%;
    }
  }

  /* REMOVE HOVER EFFECT */
  @media only screen and (max-width: 650px) {
    .group:hover > .card:nth-child(1) {
      transform: translateX(-10%) rotate(-1deg);
    }

    .group:hover > .card:nth-child(2) {
      transform: rotate(2deg);
    }

    .group:hover > .card:nth-child(3) {
      transform: translateX(-6%) rotate(-3deg);
    }

    .group:hover > .card:nth-child(4) {
      transform: translate(10%, 3%) rotate(5deg);
    }
    .information {
      height: 300px;
      top: 55%;
      overflow-y: scroll;
      right: 0%;
    }
  }

  @media only screen and (max-width: 500px) and (max-height: 900px) {
    .information {
      height: 275px;
    }
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
</style>
