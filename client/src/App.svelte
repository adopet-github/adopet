<script lang="ts">
  import { Router, Route } from 'svelte-navigator';
  import Nav from './Components/Nav.svelte';
  import TransitionContainer from './Components/Transitions/TransitionContainer.svelte';
  import DashShelter from './Pages/DashShelter.svelte';
  import Home from './Pages/Home.svelte';
  import Login from './Pages/Login.svelte';
  import Onboarding from './Pages/Onboarding.svelte';
  import Register from './Pages/Register.svelte';
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
  </Router>
</main>
