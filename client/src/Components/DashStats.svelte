<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('click', {});
  };

  export let desc: string;
  export let stat: string | number;
  export let color = 'white';
</script>

{#if color !== 'red'}
  <div class="stat-container glass">
    <h3>{stat}</h3>
    <p>{desc}</p>
  </div>
{:else}
  <div class="stat-container red">
    <Button text={`${stat} ${desc}`} on:click={handleClick} />
  </div>
{/if}

<style>
  .stat-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-radius: 30px;
    position: relative;
  }

  h3 {
    color: var(--lavender);
    font-size: 2rem;
  }

  p {
    color: var(--red);
    font-size: 1.4rem;
  }

  .red {
    font-size: 2rem;
  }

  @media only screen and (max-width: 1280px) {
    .stat-container {
      flex-direction: row;
      gap: 1rem;
    }
    h3 {
      font-size: 1.5rem;
    }
    p {
      font-size: 1rem;
    }
    .red {
      font-size: 1.5rem;
    }
  }
</style>
