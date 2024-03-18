<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  // receive error props
  export let form;

  onMount(() => {
    if (form?.status === 200) {
      goto("/admin");
    }
  });
</script>

<!-- base login page UI -->
<form method="POST" action="/login">
  <fieldset>
    <legend class="sr-only">Login form</legend>
    <div class="flex items-center gap-2">
      <label for="email" class="text-gray-700">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        class="mt-2 px-4 py-2 border border-gray-300 rounded-md"
        aria-label="Email"
      />
    </div>
    <div class="flex items-center gap-2 mt-4">
      <label for="password" class="text-gray-700">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        required
        class="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        aria-label="Password"
      />
    </div>
  </fieldset>

  <button
    type="submit"
    class="mt-4 p-2 border border-black rounded hover:underline focus:ring-2 focus:ring-black"
    >Login</button
  >
</form>

<!-- Error message -->
{#if form?.error}
  <p class="text-red-500 mt-4">{form?.error}</p>
{/if}
