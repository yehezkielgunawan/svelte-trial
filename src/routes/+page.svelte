<script>
  import "../app.css";

  export let data;
</script>

{#if data.data}
  {#each data.data as item}
    <!-- set the card link -->
    <div class="border border-black p-2 rounded first:mt-0 mt-4">
      <a href={item.url}>
        <h3>{item.name}</h3>
        <p class="text-sm">{item.url}</p>
      </a>
    </div>
  {/each}
{:else}
  <p>Loading...</p>
{/if}
