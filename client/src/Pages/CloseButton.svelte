<script lang="ts">
  import { useNavigate } from 'svelte-navigator';
  const navigate = useNavigate();

  export let text: string = 'close';
</script>

<button on:click={() => navigate(-1)}>{text}</button>

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
