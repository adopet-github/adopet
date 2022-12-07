<script lang="ts">
  export let value = '';
  export let error = false;

  const validateTextArea = () => {
    if (error && value) {
      error = false;
    }
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css"
  />
</svelte:head>

<div class="auth-input-container">
  <textarea
    class="auth-input {error && 'error'}"
    type="text"
    placeholder="Add a description"
    bind:value
    on:blur={validateTextArea}
  />
</div>

<style>
  textarea {
    padding: 0.5rem 0.5rem 1rem 0.5rem;
  }
</style>
