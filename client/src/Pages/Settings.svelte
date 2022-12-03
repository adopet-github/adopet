<script lang="ts">
  // COMPONENTS
  import Button from '../Components/Button.svelte';
  import BooleanRadio from '../Components/Inputs/BooleanRadio.svelte';
  import Email from '../Components/Inputs/Email.svelte';
  import Name from '../Components/Inputs/Name.svelte';
  import Number from '../Components/Inputs/Number.svelte';
  import AddressAutocomplete from '../Components/Inputs/AddressAutocomplete.svelte';
  import { toast, SvelteToast } from '@zerodevx/svelte-toast';

  // UTILS
  import { userCredentials } from '../Stores/userCredentials';
  import { updateShelter } from '../Services/shelter';
  import { updateAdopter } from '../Services/adopter';
  import ImagesList from '../Components/Images/ImagesList.svelte';
  import { navigate } from 'svelte-navigator';
  import { dashView } from '../Stores/dashView';

  let accountType = $userCredentials.house_type ? 'adopter' : 'shelter';

  let shelterNameError: boolean;
  let firstNameError: boolean;
  let lastNameError: boolean;
  let emailError: boolean;
  let ageError: boolean;
  let hasPetsError: boolean;
  let hasChildrenError: boolean;
  let timeAtHomeError: boolean;
  let addressError: boolean;

  let location: number[] = [];
  let hasPets = $userCredentials.has_pets?.toString();
  let hasChildren = $userCredentials.has_children?.toString();

  const handleShelterUpdate = async () => {
    if (location.length === 2) {
      userCredentials.update((prev) => ({
        ...prev,
        latitude: location[0],
        longitude: location[1]
      }));
    }
    const updated = { ...$userCredentials };
    delete updated.animals;
    delete updated.images;
    const res = await updateShelter(updated);
    if (res.status === 200) {
      toast.push('Updated successfully!', {
        theme: {
          '--toastColor': 'mintcream',
          '--toastBackground': 'rgba(72,187,120,0.9)',
          '--toastBarBackground': '#2F855A'
        }
      });
    } else {
      toast.push(`Error: ${res.message}`, {
        theme: {
          '--toastColor': 'mintcream',
          '--toastBackground': '#d33e43',
          '--toastBarBackground': 'mintcream'
        }
      });
    }
  };

  const handleAdopterUpdate = async () => {
    userCredentials.update((prev) => ({
      ...prev,
      latitude: location[0] ? location[0] : prev.latitude,
      longitude: location[1] ? location[1] : prev.longitude,
      has_pets: hasPets,
      has_children: hasChildren
    }));

    const updated = { ...$userCredentials };
    delete updated.images;
    const res = await updateAdopter(updated);
    if (res.status === 200) {
      toast.push('Updated successfully!', {
        theme: {
          '--toastColor': 'mintcream',
          '--toastBackground': 'rgba(72,187,120,0.9)',
          '--toastBarBackground': '#2F855A'
        }
      });
    } else {
      toast.push(`Error: ${res.message}`, {
        theme: {
          '--toastColor': 'mintcream',
          '--toastBackground': '#d33e43',
          '--toastBarBackground': 'mintcream'
        }
      });
    }
  };
</script>

<div class="container">
  <div class="card glass glass1">
    <div class="content-left">
      <h2>Edit profile</h2>
      <div class="images">
        <ImagesList images={$userCredentials.images} type={'profile'} />
      </div>
      <div class="details">
        <div class="left">
          {#if accountType === 'shelter'}
            <label for="Name">Shelter Name:</label>
            <Name
              bind:value={$userCredentials.name}
              nameType="Shelter name"
              bind:error={shelterNameError}
            />
          {:else}
            <label for="Name">First Name:</label>
            <Name
              nameType="First name"
              bind:value={$userCredentials.first_name}
              bind:error={firstNameError}
            />
            <label for="Name">Last Name:</label>
            <Name
              nameType="Last name"
              bind:value={$userCredentials.last_name}
              bind:error={lastNameError}
            />
          {/if}

          <label for="email">Email:</label>
          <Email bind:value={$userCredentials.email} bind:error={emailError} />
          <label for="address">Address: </label>
          <AddressAutocomplete
            bind:value={$userCredentials.address}
            bind:error={addressError}
            bind:location
          />
        </div>
        {#if accountType === 'shelter'}
          <div class="right">
            <label for="description">Description:</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              bind:value={$userCredentials.description}
            />
            <button on:click={handleShelterUpdate}
              ><Button
                text="save"
                on:click={() => {
                  $dashView[1] = 'animalList';
                  navigate(-1);
                }}
              /></button
            >
          </div>
        {/if}
      </div>
    </div>

    {#if accountType == 'adopter'}
      <div class="content-right">
        <div class="details">
          <label for="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            bind:value={$userCredentials.description}
          />
          <label for="House-type"> House type: </label>
          <div class="auth-input-container">
            <select class="auth-input" bind:value={$userCredentials.house_type}>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="townhouse">Townhouse</option>
              <option value="villa">Villa</option>
            </select>
          </div>
          <Number
            bind:value={$userCredentials.age}
            label="Your Age:"
            bind:error={ageError}
          />
          <Number
            bind:value={$userCredentials.time_at_home}
            label="Average hours at home daily:"
            bind:error={timeAtHomeError}
          />
          <div class="radio-input">
            <p>Do you have any other pets?</p>
            <BooleanRadio bind:value={hasPets} bind:error={hasPetsError} />
          </div>
          <div class="radio-input">
            <p>Do you have any children?</p>
            <BooleanRadio
              bind:value={hasChildren}
              bind:error={hasChildrenError}
            />
          </div>
          <button on:click={handleAdopterUpdate}><Button text="save" /></button>
        </div>
      </div>
    {/if}
  </div>
</div>
<SvelteToast />

<style>
  .container {
    height: 92vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .card {
    height: fit-content;
    position: relative;
    width: 1000px;
    border-radius: 20px;
    padding: 1rem;
    padding-bottom: 2.5rem;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    color: var(--black);
    gap: 1rem;
  }

  .content-left,
  .content-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    width: 50%;
  }

  .images {
    width: 80%;
  }

  .content-left .details {
    display: flex;
    flex-direction: row;
    width: 80%;
    gap: 3rem;
  }

  .details .left,
  .details .right {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 80%;
    gap: 0.5rem;
  }

  .radio-input {
    width: 100%;
  }

  h2 {
    color: var(--red);
    font-size: 2rem;
    padding: 0.5rem;
    font-weight: 900;
  }

  select {
    padding: 1rem;
  }

  button {
    width: 100%;
    margin-top: 1rem;
    background-color: transparent;
    outline: none;
  }
</style>
