<script>
  import { enhance } from "$app/forms";

  export let data;
</script>

<div class="flex items-center justify-between gap-4 flex-wrap">
  <h2>ADMIN Mode</h2>
  <form method="POST" action="?/logout" use:enhance>
    <button
      class="bg-black text-white rounded p-2 text-sm hover:underline"
      type="submit">Logout</button
    >
  </form>
</div>

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
