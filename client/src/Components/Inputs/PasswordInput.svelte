<script lang="ts">
  export let confirmation: boolean;
  export let value = '';
</script>

<input
  type="password"
  placeholder={confirmation ? 'Confirm password' : 'Password'}
  bind:value
/>

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
