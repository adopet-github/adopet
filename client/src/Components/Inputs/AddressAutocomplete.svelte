<script lang="ts">
  import { onMount } from 'svelte';

  export let value = '';
  export let location = [];
  export let error = false;
  let autocomplete;

  const validateAddy = () => {
    if (error && value) {
      error = false;
    }
  };
</script>

<!-- svelte-ignore missing-declaration -->
<svelte:head>
  <script
    src={`https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    }&libraries=places`}
    on:load={() => {
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
      autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
          types: ['address']
        }
      );

      autocomplete.addListener('place_changed', onPlaceChanged);
    }}
  ></script>
  <link
    rel="stylesheet"
    href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css"
  />
</svelte:head>

<div class="auth-input-container">
  <input
    class="auth-input {error && 'error'}"
    id="autocomplete"
    type="text"
    placeholder="Address"
    bind:value
    on:blur={validateAddy}
    autocomplete="off"
  />
  <i class="mi mi-location" />
</div>
