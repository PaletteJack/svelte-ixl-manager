<script>
    export let data;
    import { triggerModal } from '$lib/modalStore.js';
    import Modal2 from '$lib/components/Modal2.svelte';
    const { schools, username } = data;
    const showModal = () => triggerModal({header: "This is the header", content: "This is the modal content"});
    
</script>

<div class="px-4 lg:px-0">
    <h1 class="text-3xl text-green-950">License Counts</h1>
    <hr class="mb-2" />
    {#if schools.length != 0}
      <div class="w-full">
        <table
          class="table-auto w-full max-w-[800px] border-collapse max-h-[750px] overflow-y-auto"
        >
          <thead>
            <tr class="bg-green-900 text-white text-left sticky top-0">
              <th class="p-2">School</th>
              <th class="p-2">Count</th>
              <th class="p-2">License Type</th>
            </tr>
          </thead>
          <tbody>
              {#each schools as school}
              <tr
                class="teacher-row even:bg-green-100"
              >
                <td class="p-2">
                  <div class="flex gap-4 items-center">
                    { school.school_name }
                  </div>
                </td>
                <td class="p-2">
                  <span class="font-semibold">{ school.student_count }</span>
                </td>
                <td class="p-2">
                  K-8 All Subjects
                </td>
              </tr>
              {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p>No data loaded yet. <a class="link" href="/admin">Load Data?</a></p>
      <button class="btn bg-orange-500 hover:bg-orange-400 text-white" on:click={showModal}>Trigger modal</button>
    {/if}
  </div>

  <Modal2 />