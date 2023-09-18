<script>
  import SimpleDrawer from '$lib/components/SimpleDrawer.svelte';
  export let data;
  const { school, classes } = data;
  let showModal = false;
  const triggerModal = () => showModal = true;
  const closeModal = () => showModal = false;

  const selectItem = (id) => {
    console.log(id);
  }
</script>

<div class="w-full flex gap-4 mb-4">
    <button
      id="classroom-add-class"
      class="btn border-2 border-solid min-w-[120px] border-green-500 hover:bg-green-500 hover:text-white"
    >
      Add
    </button>
    <button
      id="classroom-delete-class"
      class="btn border-2 border-solid min-w-[120px] border-red-400 hover:bg-red-400 hover:text-white"
    >
      Delete
    </button>
  </div>
  {#if classes.length != 0}
  <table class="table-auto w-full border-collapse max-h-[750px] overflow-y-auto">
    <thead>
      <tr class="bg-green-900 text-white text-left sticky top-0">
        <th class="p-2">Section ID</th>
        <th class="p-2">Name</th>
        <th class="p-2">Grade</th>
      </tr>
    </thead>
    <tbody>
        {#each classes as section}
        <tr
        class="section-row even:bg-green-100 hover:bg-gray-200 hover:cursor-pointer"
        data-classroom-id="{section.id}"
        on:click={triggerModal}
      >
        <td class="p-2 flex items-center">
          <input class="mr-4" type="checkbox" value="{section.id}" on:click|stopPropagation={() => selectItem(section.id)}/>
          { section.section_id }
        </td>
        <td class="p-2 w-fit">{ section.name }</td>
        <td class="p-2">{ section.grade }</td>
      </tr>
        {/each}
    </tbody>
  </table>
  {:else}
  <p>No classes to show!</p>
  {/if}

  <SimpleDrawer isOpen={showModal} school={school} on:close={closeModal} />