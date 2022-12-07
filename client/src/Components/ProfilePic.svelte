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
    min-height: 100%;
    min-width: 100%;
    border-radius: 50%;
    background-size: cover;
  }
</style>
