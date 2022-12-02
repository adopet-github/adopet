<script lang="ts">
  import { dashView } from '../Stores/dashView';

  export let text: string = 'close';
  export let closeTo: string = '';
</script>

<button
  on:click={() => {
    $dashView[1] = closeTo;
  }}>{text}</button
>

<style>
  button {
    color: var(--red);
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: rgba(255, 255, 255, 0);
    font-size: 1rem;
  }
</style>
