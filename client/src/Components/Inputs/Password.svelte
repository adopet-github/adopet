<script lang="ts">
  export let value = '';
  export let error = false;

  const validatePassword = () => {
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
  <input
    class="auth-input {error && 'error'}"
    type="password"
    placeholder="Password"
    bind:value
    on:blur={validatePassword}
  />
  <i class="mi mi-lock" />
</div>
