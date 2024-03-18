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

<footer class="mt-8">
  <hr class="bg-black h-0.5" />
  <a href="https://yehezgun.com"
    >{new Date().toLocaleDateString("en-GB", {
      year: "numeric",
    })} | Yehezkiel Gunawan</a
  >
</footer>
