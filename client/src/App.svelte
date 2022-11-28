<script lang="ts">
  import { Router, Route } from 'svelte-navigator';
  import DashProfileCard from './Components/DashProfileCard.svelte';
  import Nav from './Components/Nav.svelte';
  import TransitionContainer from './Components/Transitions/TransitionContainer.svelte';
  import AddPet from './Pages/AddPet.svelte';
  import DashShelter from './Pages/DashShelter.svelte';
  import Home from './Pages/Home.svelte';
  import Login from './Pages/Login.svelte';
  import Matches from './Pages/Matches.svelte';
  import Onboarding from './Pages/Onboarding.svelte';
  import Register from './Pages/Register.svelte';
  import Settings from './Pages/Settings.svelte';
  import Swipe from './Pages/Swipe.svelte';
</script>

<main>
  <Router>
    <Nav />
    <Route path="/">
      <Home />
    </Route>
    <Route path="login">
      <TransitionContainer>
        <Login />
      </TransitionContainer>
    </Route>
    <Route path="register">
      <TransitionContainer>
        <Register />
      </TransitionContainer>
    </Route>
    <Route path="onboarding">
      <Onboarding />
    </Route>
    <Route path="shelter/dashboard">
      <DashShelter />
    </Route>
    <Route path="shelter/addpet">
      <AddPet />
    </Route>
    <Route path="settings">
      <Settings />
    </Route>
    <Route path="user/swipe">
      <Swipe />
    </Route>
    <Route path="user/matches">
      <Matches />
    </Route>
  </Router>
</main>
