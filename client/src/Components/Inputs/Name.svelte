<script lang="ts">
  export let value = '';
  export let nameType: string;
  export let error = false;

  const validateName = () => {
    if (error && value) {
      error = false;
    }
  };
</script>

<svelte:head>
  <script
    src="https://kit.fontawesome.com/2611249795.js"
    crossorigin="anonymous"
  ></script>
</svelte:head>

<div class="auth-input-container">
  <input
    class="auth-input {error && 'error'}"
    type="text"
    placeholder={nameType}
    bind:value
    on:blur={validateName}
  />
  {#if nameType == 'Shelter name'}
    <i class="mi mi-home" />
  {:else if nameType == 'Pet name'}
    <i class="fa-solid fa-paw" />
  {:else}
    <i class="mi mi-user" />
  {/if}
</div>
