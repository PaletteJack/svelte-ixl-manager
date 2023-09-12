<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let school;
    export let isOpen = false;
    let tab = 0;

    const closeDrawer = () => {
      dispatch('close')
    }

    const changeTab = (id) => {
      tab = id;
    }
</script>

<style lang="postcss">
  .open-tab {
    @apply bg-[#44B78B] text-white
  }
</style>

{#if isOpen}
<div
  id="classroom-drawer"
  class="fixed top-0 right-0 h-full w-full lg:w-6/12 mt-[96px] overflow-y-auto z-30 bg-green-50 shadow-xl pb-6"
>
  <div
    class="flex justify-between items-center pl-4 pr-8 py-3 bg-[#C9F0DD] mb-4 sticky top-0"
  >
    <p id="drawer-header" class="text-2xl font-semibold">{school.name}</p>
    <button
      id="classroom-drawer-close"
      class="font-semibold text-xl w-6 h-6 flex items-center justify-center rounded-full p-5 bg-gray-100 hover:bg-white hover:shadow-lg transition-all"
      on:click={closeDrawer}
    >
      X
    </button>
  </div>

  <div class="w-full px-4">
    <div class="tab w-full">
      <div class="">
        <button
          class="tablinks px-4 py-2 m-0"
          data-name="Teachers"
          class:open-tab={tab == 0}
          on:click={() => changeTab(0)}
        >
          Teachers
        </button>
        <button 
        class="tablinks px-4 py-2 m-0" 
        data-name="Students"
        class:open-tab={tab == 1}
        on:click={() => changeTab(1)}
        >
          Students
        </button>
      </div>
      <hr class="mt-2 mb-4" />
    </div>

    <div id="Teachers" class="px-4 tabcontent">
      <div class="flex gap-2 mb-2">
        <button
          id="teacher-add"
          class="border-2 border-solid border-green-500 hover:bg-green-500 hover:text-white rounded-sm px-2 py-1"
        >
          Add Teacher
        </button>
        <button
          id="teacher-delete"
          class="border-2 border-solid border-red-400 hover:bg-red-400 hover:text-white rounded-sm px-2 py-1"
        >
          Unassign Teachers
        </button>
      </div>
      <div id="teacher-list"></div>
    </div>

    <div id="Students" class="px-4 tabcontent hidden">
      <div class="flex gap-2 mb-2">
        <button
          id="student-add"
          class="border-2 border-solid border-green-500 hover:bg-green-500 hover:text-white rounded-sm px-2 py-1"
        >
          Add Student
        </button>
        <button
          id="student-delete"
          class="border-2 border-solid border-red-400 hover:bg-red-400 hover:text-white rounded-sm px-2 py-1"
        >
          Unassign Students
        </button>
      </div>
      <div id="student-list"></div>
    </div>
  </div>
</div>
{/if}