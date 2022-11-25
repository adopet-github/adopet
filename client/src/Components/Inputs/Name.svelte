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
  {:else}
    <i class="mi mi-user" />
  {/if}
</div>
