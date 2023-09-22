<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let school;
    export let isOpen = false;

    const closeDrawer = () => {
      dispatch('close')
    }
</script>

<style lang="postcss">
  .drawer {
    @apply fixed top-0 right-0 h-full w-full lg:w-6/12 mt-[96px] overflow-y-auto z-30 bg-green-50 shadow-xl pb-6
  }

  .drawer-header {
    @apply flex justify-between items-center pl-4 pr-8 py-3 bg-emerald-100 mb-4 sticky top-0
  }
  .open-tab {
    @apply bg-emerald-600 text-white
  }

  .close-btn {
    @apply font-semibold text-xl w-6 h-6 flex items-center justify-center rounded-full p-5 bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg transition-all
  }

  .add-btn {
    @apply border-2 border-solid border-green-500 hover:bg-green-500
  }

  .delete-btn {
    @apply border-2 border-solid border-red-400 hover:bg-red-400
  }
</style>

{#if isOpen}
<div class="drawer">
  <div class="drawer-header">
    <p class="text-2xl font-semibold">{school.name}</p>
    <button class="close-btn" on:click={closeDrawer}>
      X
    </button>
  </div>
</div>
{/if}