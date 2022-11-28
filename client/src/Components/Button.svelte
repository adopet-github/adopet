<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let text: string;
  export let colour = 'red';
  export let fontSize = '1rem';

  const handleClick = () => {
    dispatch('click', {});
  };
</script>

{#if colour === 'red'}
  <button class="primary" style="font-size:{fontSize}" on:click={handleClick}
    >{text}</button
  >
{:else}
  <button class="secondary" style="font-size:{fontSize}" on:click={handleClick}
    >{text}</button
  >
{/if}

<style>
  button {
    padding: 0.8rem 1rem;
    flex: 1;
    width: 100%;
    border-radius: 20px;
  }
  button.primary {
    background: #d33e43;
    background: linear-gradient(180deg, #d33e43 0%, #a52327 100%);
    color: var(--white);
  }
  button.primary:hover {
    background: #a52327;
    background: linear-gradient(180deg, #a52327 0%, #6b1316 100%);
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
</style>
