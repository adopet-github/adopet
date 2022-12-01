<script lang="ts">
  export let fileInput;
  export let file = '';

  $: fileName = file.split('\\')[file.split('\\').length - 1];
</script>

<div>
  <label for="files" class="btn">Select Image</label>
  <input
    id="files"
    style="display:none;"
    type="file"
    accept=".png, .jpg, .jpeg"
    bind:this={fileInput}
    bind:value={file}
  />
  {#if fileName}
    <p>{fileName}</p>
  {:else}
    <p>No Image Chosen</p>
  {/if}
</div>

<style>
  div {
    display: flex;
    padding: 1rem;
    align-items: center;
    color: black;
  }
  .btn {
    cursor: pointer;
    padding: 1rem;
    background-color: var(--red);
    color: white;
    border-radius: 1rem;
  }
  p {
    padding: 1rem;
  }
</style>
