<script lang="ts">
  export let value = '';
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css"
  />
</svelte:head>

<div class="auth-input-container">
  <input class="auth-input" type="text" placeholder="Email" bind:value />
  <i class="mi mi-email" />
</div>
