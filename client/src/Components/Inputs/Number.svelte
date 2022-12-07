<script lang="ts">
  export let value: number;
  export let label: string;
  export let error = false;

  const validateNumber = () => {
    if (error && value > 0) {
      if (label === 'Average hours at home daily:' && value <= 24) {
        error = false;
      } else if (value < 99) {
        error = false;
      }
    }
  };
  $: if (label === 'Average hours at home daily:' && value > 24) value = 24;
  $: if ((label.includes('Age') || label.includes('old')) && value > 99)
    value = 99;
</script>

<div class="auth-input-container">
  <label for="input">
    {label}
  </label>
  <input
    name="input"
    class="auth-input {error && 'error'}"
    type="number"
    bind:value
    on:blur={validateNumber}
  />
</div>

<style>
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  label {
    color: var(--black);
  }
  input {
    padding: 1rem 0.5rem;
    min-width: 20%;
    max-width: 40%;
  }

  @media only screen and (max-height: 750px) {
    input {
      padding: 0.5rem 0.5rem;
    }
  }
</style>
