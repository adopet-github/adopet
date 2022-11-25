<script lang="ts">
  import { Router, Route } from 'svelte-navigator';
  import Nav from './Components/Nav.svelte';
  import TransitionContainer from './Components/Transitions/TransitionContainer.svelte';
  import Home from './Pages/Home.svelte';
  import Login from './Pages/Login.svelte';
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
  </Router>
</main>
