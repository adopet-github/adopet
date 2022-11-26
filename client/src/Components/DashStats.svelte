<script>
  export let desc;
  export let stat;
  export let color = 'white';
</script>

{#if color !== 'red'}
  <div class="stat-container glass">
    <h3>{stat}</h3>
    <p>{desc}</p>
  </div>
{:else}
  <div class="stat-container red">
    <h3>{stat}</h3>
    <p>{desc}</p>
  </div>
{/if}

<style>
  .stat-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    border-radius: 30px;
    padding: 1rem;
    position: relative;
  }

  h3 {
    color: var(--lavendar);
    font-size: 4rem;
    padding: 2rem;
  }

  p {
    color: var(--red);
    font-size: 1.4rem;
  }

  .red {
    background-color: var(--red);
  }

  .red p,
  .red h3 {
    color: var(--white);
  }
</style>
