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
  button.primary {
    background: #d33e43;
    background: linear-gradient(180deg, #d33e43 0%, #a52327 100%);
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.8rem 1rem;
    width: 100%;
    border-radius: 20px;
    color: var(--white);
  }
  button.primary:hover {
    background: #a52327;
    background: linear-gradient(180deg, #a52327 0%, #6b1316 100%);
  }
  button.secondary {
    color: #282829;
    background: #e7e7e7;
    background: linear-gradient(180deg, #e7e7e7 0%, #afafaf 100%);
    margin-top: 1rem;
    padding: 20px 20px;
    width: 100%;
    border-radius: 20px;
  }
  button.secondary:hover {
    background: #afafaf;
    background: linear-gradient(180deg, #afafaf 0%, #797979 100%);
  }
</style>
