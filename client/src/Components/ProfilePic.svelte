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
  <img src={icon} alt={icon} />
{:else}
  <div class="img-container" style={`background-image: url(${img})`} />
{/if}

<style>
  .img-container {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    background-size: cover;
  }
</style>
