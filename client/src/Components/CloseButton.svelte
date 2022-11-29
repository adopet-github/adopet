<script lang="ts">
  import { useNavigate } from 'svelte-navigator';
  import { dashView } from '../Stores/dashView';
  const navigate = useNavigate();

  export let text: string = 'close';
  export let path: string = '/shelter/dashboard';
</script>

<button
  on:click={() => {
    $dashView = 'allAnimals';
    navigate(path);
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
