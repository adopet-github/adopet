<script lang="ts">
  export let value = '';
  let input;
</script>

<input bind:this={input} type="text" placeholder="Email" bind:value />

<style>
  input {
    padding: 1rem;
    border-radius: 10px;
    width: 50%;
  }

  input:focus {
    outline-offset: 1px;
    outline: solid 2px white;
  }
</style>
