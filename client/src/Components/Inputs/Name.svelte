<script lang="ts">
  export let value = '';
  export let nameType: string;
</script>

<div class="auth-input-container">
  <input class="auth-input" type="text" placeholder={nameType} bind:value />
  {#if nameType == 'Shelter name'}
    <i class="mi mi-home" />
  {:else}
    <i class="mi mi-user" />
  {/if}
</div>
