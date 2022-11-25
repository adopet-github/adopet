<script lang="ts">
  import { Router, Route } from 'svelte-navigator';
  import Nav from './Components/Nav.svelte';
  import Home from './Pages/Home.svelte';
  import Login from './Pages/Login.svelte';
</script>

<main>
  <Router>
    <Nav />
    <Route path="/">
      <Home />
    </Route>
    <Route path="login">
      <Login />
    </Route>
  </Router>
</main>
