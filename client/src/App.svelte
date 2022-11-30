<script lang="ts">
  // COMPONENTS
  import Nav from './Components/Nav.svelte';
  import Home from './Pages/Home.svelte';
  import Login from './Pages/Login.svelte';
  import Register from './Pages/Register.svelte';
  import Onboarding from './Pages/Onboarding.svelte';
  import Settings from './Pages/Settings.svelte';

  import DashShelter from './Pages/DashShelter.svelte';
  import Matches from './Pages/Matches.svelte';
  import Swipe from './Pages/Swipe.svelte';

  import TransitionContainer from './Components/Transitions/TransitionContainer.svelte';
  import AddPet from './Pages/AddPet.svelte';
  import AnimalProfile from './Components/AnimalProfile.svelte';
  import SausageLoader from './Components/Loaders/SausageLoader.svelte';

  // ROUTE GUARDS
  import AdopterRoute from './Components/PrivateRoutes/Adopter/AdopterRoute.svelte';
  import ShelterRoute from './Components/PrivateRoutes/Shelter/ShelterRoute.svelte';
  import PrivateRoute from './Components/PrivateRoutes/User/PrivateRoute.svelte';
  import UnauthorizedRoute from './Components/PrivateRoutes/Unauthorized/UnauthorizedRoute.svelte';

  // UTILS
  import { onMount } from 'svelte';
  import { getProfile } from './Services/auth';
  import { userCredentials } from './Stores/userCredentials';
  import { Router, Route } from 'svelte-navigator';

  // userCredentials.set({ name: 'alex' }); ////// REMOVE THIS AND UNCOMMENT THE IF STATEMENT WHEN BACKEND IS DONE

  let isLoading = true;

  onMount(async () => {
    const res = await getProfile();
    if (res.status === 200) {
      console.log('user', res.data);
      userCredentials.set(res.data);
    }
    setTimeout(() => {
      isLoading = false;
    }, 1000);
  });
</script>

<main>
  <!-- {#if isLoading}
    <SausageLoader />
  {:else} -->
  <Router>
    <Nav />
    <Route path="/">
      <Home />
    </Route>
    <UnauthorizedRoute path="login">
      <TransitionContainer>
        <Login />
      </TransitionContainer>
    </UnauthorizedRoute>
    <UnauthorizedRoute path="register">
      <TransitionContainer>
        <Register />
      </TransitionContainer>
    </UnauthorizedRoute>
    <Route path="onboarding">
      <Onboarding />
    </Route>
    <ShelterRoute path="shelter/dashboard">
      <DashShelter />
    </ShelterRoute>
    <ShelterRoute path="shelter/addpet">
      <AddPet />
    </ShelterRoute>
    <ShelterRoute path="shelter/animals/:id">
      <AnimalProfile />
    </ShelterRoute>
    <PrivateRoute path="settings">
      <Settings />
    </PrivateRoute>
    <AdopterRoute path="user/swipe">
      <Swipe />
    </AdopterRoute>
    <AdopterRoute path="user/matches">
      <Matches />
    </AdopterRoute>
  </Router>
  <!-- {/if} -->
</main>
