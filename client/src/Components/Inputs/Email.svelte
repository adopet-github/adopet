<script lang="ts">
  export let value = '';
  export let error = false;

  const validateEmail = () => {
    if (error && value.includes('@') && value.includes('.')) {
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
  <input
    class="auth-input {error && 'error'}"
    type="text"
    placeholder="Email"
    bind:value
    on:blur={validateEmail}
  />
  <i class="mi mi-email" />
</div>
