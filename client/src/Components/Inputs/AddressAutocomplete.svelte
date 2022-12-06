<script lang="ts">
  import { onMount } from 'svelte';

  export let value = '';
  export let location = [];
  export let error = false;
  export let id: string;
  let autocomplete;

  onMount(() => {
    // @ts-ignore
    if (window.google) {
      console.log('hi');
      const onPlaceChanged = () => {
        const place = autocomplete.getPlace();
        value = place.formatted_address;
        if (place.geometry) {
          location = [
            place.geometry.location.lat(),
            place.geometry.location.lng()
          ];
        }
      };
      // @ts-ignore
      autocomplete = new google.maps.places.Autocomplete(
        document.getElementById(id),
        {
          types: ['address']
        }
      );

      autocomplete.addListener('place_changed', onPlaceChanged);
    }
  });

  const validateAddy = () => {
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
    {id}
    type="text"
    placeholder="Address"
    bind:value
    on:blur={validateAddy}
    autocomplete="off"
  />
  <i class="mi mi-location" />
</div>
