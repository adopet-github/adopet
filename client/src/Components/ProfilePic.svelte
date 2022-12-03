<script>
  import icon from '../assets/SVGs/profile-icon.svg';
  export let img = '';
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
  />
</svelte:head>

{#if img === ''}
  <div class="img-container" style={`background-image: url(${icon})`} />
{:else}
  <div class="img-container" style={`background-image: url(${img})`} />
{/if}

<style>
  .img-container {
    min-height: 4rem;
    min-width: 4rem;
    border-radius: 50%;
    background-size: cover;
  }

  @media only screen and (max-width: 992px) {
    .img-container {
      min-height: 2.5rem;
      min-width: 2.5rem;
      /* border-radius: 25px; */
    }
  }
</style>
