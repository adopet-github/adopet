<script>
  import dog from '../assets/imgs/flower_dog.png';
  import redCat from '../assets/imgs/red_cat.png';
  import yellowCat from '../assets/imgs/yellow_cat.png';

  import Button from '../Components/Button.svelte';
  import { useNavigate } from 'svelte-navigator';

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');
  };
</script>

<div class="main-container">
  <div class="content-left">
    <div class="left-text">
      <h1>Hey!</h1>
      <p>
        So far, we've helped <span>218</span> <br /> pets to find a new home.
      </p>
      <p>Help us help more.</p>
      <Button text={'REGISTER NOW'} colour={'red'} on:click={handleClick} />
    </div>
  </div>
  <div class="content-right">
    <div class="grid-container">
      <div class="div1">
        <img src={dog} alt="animal" />
      </div>
      <div class="div2">
        <img src={redCat} alt="animal" />
      </div>
      <div class="div3">
        <img src={yellowCat} alt="animal" />
      </div>
    </div>
  </div>
</div>

<style>
  .main-container {
    display: flex;
    height: 92vh;
    background-color: white;
    background-image: url('../assets/SVGs/red_blob_grad.svg'),
      url('../assets/SVGs/grey_blob_grad.svg'),
      url('../assets/SVGs/cream_blob_grad.svg');
    background-blend-mode: multiply;
    background-repeat: no-repeat;
    background-position: 100% 100%, 0% 0%, 100% 50%;
    background-size: 1000px, 1200px, 100%;
  }
  .content-left,
  .content-right {
    height: 100%;
    flex: 1;
    padding: 2%;
    /* color: #d33e43; */
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h1 {
    margin-top: 1rem;
    font-size: 3rem;
    padding-bottom: 1rem;
    align-self: flex-start;
  }

  p {
    position: relative;
    font-size: 1.6rem;
    line-height: 2rem;
    white-space: nowrap;
  }

  span {
    font-size: 4rem;
    position: relative;
    padding: 20px 10px;
    color: #d33e43;
  }
  .content-left {
    align-items: flex-start;
    margin-left: 5vw;
  }

  .left-text {
    padding: 2rem;
    background: rgba(223, 223, 223, 0.33);
    border-radius: 20px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.31);
  }

  .content-right {
    flex: 1.2;
    /* background-image: url('../assets/SVGs/cream_blob.svg'),
      url('../assets/SVGs/grey_blob.svg'), url('../assets/SVGs/red_blob.svg');
    background-blend-mode: multiply;
    background-repeat: no-repeat;
    background-position: right; */
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(7, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }

  img {
    width: 100%;
  }

  .div1 {
    grid-area: 2 / 4 / 7 / 6;
  }
  .div2 {
    grid-area: 1 / 1 / 4 / 4;
  }
  .div3 {
    grid-area: 5 / 2 / 8 / 4;
    position: relative;
    top: -3rem;
  }
</style>
