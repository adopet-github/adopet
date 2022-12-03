<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let text: string;
  export let colour = 'red';

  const handleClick = () => {
    dispatch('click', {});
  };
</script>

{#if colour === 'red'}
  <button class="primary" on:click={handleClick}>{text}</button>
{:else}
  <button class="secondary" on:click={handleClick}>{text}</button>
{/if}

<style>
  button {
    padding: 1rem;
    flex: 1;
    width: 100%;
    border-radius: 20px;
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
  }
  button.primary {
    background: #d33e43;
    background: linear-gradient(180deg, #d33e43 0%, #a52327 100%);
    color: var(--white);
  }
  button.primary:hover {
    background: rgb(0, 0, 0, 0.25);
  }
  button.secondary {
    background: #e7e7e7;
    background: linear-gradient(180deg, #e7e7e7 0%, #afafaf 100%);
    color: var(--black);
  }
  button.secondary:hover {
    background: #afafaf;
    background: linear-gradient(180deg, #afafaf 0%, #797979 100%);
  }

  @media only screen and (max-height: 750px) {
    button {
      padding: 0.5rem;
      font-size: 0.8rem;
    }
  }
</style>
