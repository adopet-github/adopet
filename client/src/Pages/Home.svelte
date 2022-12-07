<script lang="ts">
  import dog from '../assets/imgs/flower_dog.png';
  import redCat from '../assets/imgs/red_cat.png';
  import yellowCat from '../assets/imgs/yellow_cat.png';

  import Button from '../Components/Button.svelte';
  import { useNavigate } from 'svelte-navigator';
  import BackgroundAnimation from '../Components/BackgroundAnimation.svelte';

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');
  };
</script>

<div class="main-container">
  <BackgroundAnimation />
  <!-- <div class="content-left"> -->
  <!-- </div> -->
  <!-- <div class="content-right"> -->
  <div class="grid-container">
    <div class="left-div">
      <div class="left-text glass glass1">
        <h1>Hey!</h1>
        <p>
          So far, we've helped <span>218</span> <br /> pets to find a new home.
        </p>
        <p>Help us help more.</p>
        <Button text={'Register'} on:click={handleClick} />
      </div>
    </div>
    <div class="div1">
      <img src={dog} alt="a dog holding a flower" />
    </div>
    <div class="div2">
      <img src={redCat} alt="a cat lying on a red sofa" />
    </div>
    <div class="div3">
      <img src={yellowCat} alt="a ginger cat looking up" />
    </div>
  </div>
  <!-- </div> -->
</div>

<style>
  .main-container {
    display: flex;
    height: 92vh;
    background-image: url('../assets/SVGs/red_blob_grad.svg');
    background-blend-mode: multiply;
    background-repeat: no-repeat;
    background-position: 100% 100%;
    background-size: 1000px;
    color: var(--lavender);
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  span {
    font-size: 4rem;
    position: relative;
    padding: 20px 10px;
    color: var(--red);
    font-weight: 900;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    margin: 2rem;
  }

  img {
    width: 100%;
    position: relative;
  }

  h1 {
    margin-top: 1rem;
    font-size: 3rem;
    align-self: flex-start;
  }

  p {
    position: relative;
    font-size: 1.6rem;
    line-height: 2rem;
    white-space: nowrap;
    margin-bottom: 2rem;
  }

  .left-text {
    padding: 2rem;
    width: fit-content;
    height: fit-content;
    border-radius: 20px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(5px);
  }

  .left-div {
    grid-area: 2 / 1 / 5 / 6;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  }

  .div1 {
    grid-area: 2 / 9 / 5 / 11;
    height: fit-content;
    width: fit-content;
  }

  .div2 img {
    width: 150%;
  }
  .div2 {
    grid-area: 1 / 6 / 3 / 8;
  }
  .div3 {
    grid-area: 4 / 6 / 6 / 8;
  }

  @media only screen and (max-width: 1280px) {
    .grid-container {
      max-height: 100%;
    }
    .left-text {
      padding: 1rem;
    }
  }

  @media only screen and (max-width: 992px) {
    h1 {
      margin-top: 1rem;
      font-size: 2rem;
    }

    p {
      font-size: 1.4rem;
      line-height: 2rem;
      margin-bottom: 2rem;
    }

    span {
      font-size: 3rem;
    }
    .left-div {
      grid-area: 2 / 1 / 5 / 6;
    }
    .div1 {
      grid-area: 2 / 8 / 5 / 11;
    }
    .div2 {
      grid-area: 1 / 5 / 3 / 8;
    }
    .div3 {
      grid-area: 4 / 5 / 6 / 8;
    }
  }

  @media only screen and (max-width: 688px) {
    .main-container {
      flex-direction: column;
      justify-content: flex-start;
    }

    h1 {
      margin-top: 1rem;
      font-size: 3rem;
      align-self: flex-start;
    }

    p {
      position: relative;
      font-size: 1.6rem;
      line-height: 2rem;
      white-space: nowrap;
      margin-bottom: 2rem;
    }

    .grid-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .left-div {
      position: relative;
    }
    .div1 {
      display: none;
    }
    .div2 {
      display: none;
    }
    .div3 {
      display: block;
    }
  }

  @media only screen and (max-width: 400px) {
    h1 {
      margin-top: 1rem;
      font-size: 2rem;
    }

    p {
      font-size: 1.2rem;
      line-height: 1.2rem;
      margin-bottom: 2rem;
    }

    span {
      font-size: 2rem;
    }
  }
</style>
