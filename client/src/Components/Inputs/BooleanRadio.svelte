<script lang="ts">
  export let value: boolean;
  export let error: boolean;

  const validateRadio = () => {
    if (error && value) {
      error = false;
    }
  };
</script>

<div class="radio" on:blur={validateRadio}>
  <label class={error && 'error'}>
    <input
      type="radio"
      bind:group={value}
      value="true"
      on:blur={validateRadio}
      checked
    />
    Yes
  </label>
  <label class={error && 'error'}>
    <input
      type="radio"
      bind:group={value}
      value="false"
      on:blur={validateRadio}
    />
    No
  </label>
</div>

<style>
  .radio {
    display: flex;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    accent-color: var(--black);
  }

  /* label {
    display: grid;
    grid-template-columns: 1em auto;
    gap: 0.5em;
    border: 1px solid #374151;
    width: 50%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15.2px);
    -webkit-backdrop-filter: blur(15.2px);
    border: 1px solid rgba(255, 255, 255, 0.19);
    cursor: pointer;
  } */

  label {
    display: grid;
    grid-template-columns: 1em auto;
    gap: 0.5em;
    padding: 0.5rem;
    cursor: pointer;
  }
</style>
