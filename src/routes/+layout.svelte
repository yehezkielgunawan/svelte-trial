<script>
  import Header from "$components/Header.svelte";
  import NavBar from "$components/NavBar.svelte";
  import "../app.css";
</script>

<Header />
<NavBar />

<main>
  <slot />
</main>
