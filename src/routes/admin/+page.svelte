<script lang="ts">
  import { enhance } from "$app/forms";
  import type { LinkData } from "$lib/types.js";

  export let data;
  export let form;
  let linkID: number;
  let pageName: string;
  let url: string;

  const editInput = (linkData: LinkData) => {
    linkID = linkData.id;
    pageName = linkData.name;
    url = linkData.url;
  };
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

<form action="?/add" method="POST" class="mt-4">
  <div class="flex items-center gap-4 justify-between flex-wrap">
    <input
      type="text"
      placeholder="Page Name"
      class="w-full md:w-auto p-1 rounded"
      required
      name="pageName"
      id="pageName"
      bind:value={pageName}
    />
    <input
      type="text"
      placeholder="URL"
      class="w-full md:w-auto p-1 rounded"
      required
      name="url"
      id="url"
      bind:value={url}
    />
    <input type="hidden" name="id" id="id" bind:value={linkID} />
  </div>

  <button
    type="submit"
    class="bg-white text-black py-1 px-2 rounded mt-2 font-bold w-full hover:underline active:underline"
    >SUBMIT</button
  >
</form>
{#if form?.status === 201}
  <p class="bg-green-500 rounded text-white font-bold mt-4 p-1 w-full">
    {form.body.message}
  </p>
{/if}
{#if form?.status === 200}
  <p class="bg-red-500 rounded text-white font-bold mt-4 p-1 w-full">
    {form.body.message}
  </p>
{/if}

{#if data.data}
  {#each data.data as item}
    <!-- set the card link -->
    <div
      class="border border-black p-2 rounded first:mt-0 mt-4 flex w-full items-center md:justify-between flex-wrap gap-4 md:flex-nowrap"
    >
      <a href={item.url} target="_blank" class="w-full md:w-auto">
        <h3>{item.name}</h3>
        <p class="text-sm">{item.url}</p>
      </a>
      <div class="flex items-center gap-4">
        <button
          class="text-sm border rounded bg-black text-white p-1 hover:underline active:underline"
          on:click={() => editInput(item)}>Edit</button
        >
        <form action="?/delete" method="POST" use:enhance>
          <input type="hidden" name="id" value={item.id} />
          <button
            class="text-sm border rounded bg-red-500 text-white p-1 hover:underline active:underline"
            type="submit">Delete</button
          >
        </form>
      </div>
    </div>
  {/each}
{:else}
  <p>Loading...</p>
{/if}
