<script>
  import cream from '../assets/SVGs/cream_blob_grad.svg';
  import red from '../assets/SVGs/red_blob_grad.svg';
  import grey from '../assets/SVGs/grey_blob_grad.svg';
</script>

<div class="container">
  <div class="blob_cream" />
  <div class="blob_red" />
  <div class="blob_grey" />
</div>

<style>
  .container {
    min-height: 92vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    overflow: hidden;
    z-index: -99;
  }
  .blob_red {
    position: absolute;
    width: 900px;
    height: 900px;
    background: #a52327;
    background: linear-gradient(180deg, #a52327 0%, #6b1316 100%);
    mix-blend-mode: multiply;
    -webkit-animation: move_red 25s infinite alternate;
    animation: move_red 25s infinite alternate;
    transition: 1s cubic-bezier(0.07, 0.8, 0.16, 1);
  }
  .blob_cream {
    position: absolute;
    width: 300px;
    height: 800px;
    background: var(--cream);
    background: linear-gradient(
      180deg,
      var(--cream) 0%,
      rgb(247, 238, 238) 100%
    );
    mix-blend-mode: darken;
    -webkit-animation: move_cream 25s infinite alternate;
    animation: move_cream 22s infinite alternate;
    transition: 1s cubic-bezier(0.07, 0.8, 0.16, 1);
  }
  .blob_grey {
    position: absolute;
    width: 600px;
    height: 600px;
    background: var(--lavender);
    background: linear-gradient(180deg, var(--lavender) 0%, var(--grey) 100%);
    mix-blend-mode: multiply;
    -webkit-animation: move_grey 25s infinite alternate;
    animation: move_grey 22s infinite alternate;
    transition: 1s cubic-bezier(0.07, 0.8, 0.16, 1);
  }

  /* .blob:hover {
    width: 520px;
    height: 520px;
    -webkit-filter: blur(30px);
    filter: blur(30px);
    box-shadow: inset 0 0 0 5px rgba(255, 255, 255, 0.6),
      inset 100px 100px 0 0px #fa709a, inset 200px 200px 0 0px #784ba8,
      inset 300px 300px 0 0px #2b86c5;
  } */

  @-webkit-keyframes move_red {
    from {
      transform: translate(-100px, -50px) rotate(-90deg);
      border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
      width: 100px;
    }

    to {
      transform: translate(500px, 100px) rotate(-10deg);
      border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;
      width: 300px;
    }
  }

  @keyframes move_red {
    from {
      transform: translate(-100px, -50px) rotate(-90deg);
      border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
      width: 300px;
    }

    to {
      transform: translate(500px, 100px) rotate(-180deg);
      border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;
      width: 900px;
    }
  }

  @keyframes move_cream {
    from {
      transform: translate(-100px, -500px) rotate(-270deg);
      border-radius: 94% 76% 35% 65% / 97% 36% 64% 73%;
      width: 300px;
    }

    to {
      transform: translate(-500px, -50px) rotate(-90deg);
      border-radius: 68% 55% 45% 99% / 76% 24% 33% 67%;
      width: 800px;
    }
  }

  @keyframes move_grey {
    from {
      transform: translate(-200px, -250px) rotate(-70deg);
      border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
      width: 1200px;
    }

    to {
      transform: translate(-500px, 100px) rotate(-0deg);
      border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;
      width: 400px;
    }
  }
</style>
