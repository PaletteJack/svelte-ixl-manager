<script>
  import ClassContents from '$lib/components/ClassContents.svelte';
  import { triggerDrawer } from "$lib/drawerStore.js"
	export let data;
	const { school, classes } = data;
	let showModal = false;

	const selectItem = (id) => {
		console.log(id);
	};

  const handleDrawer = async (section) => {
    const req = await fetch('/api/get-section-users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id: section.id})
    })

    const classData = await req.json();

    triggerDrawer({
      content: ClassContents,
      header: section.name,
      props: {
        classData
      }
    });
  }
</script>

<div class="w-full flex gap-4 mb-4">
	<button id="classroom-add-class" class="btn w-btn bg-green-500 hover:bg-green-400 text-white">
		Add
	</button>
	<button id="classroom-delete-class" class="btn w-btn bg-red-500 hover:bg-red-400 text-white">
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
					on:click={() => handleDrawer(section)}
				>
					<td class="p-2 flex items-center">
						<input
							class="mr-4"
							type="checkbox"
							value={section.id}
							on:click|stopPropagation={() => selectItem(section.id)}
						/>
						{section.section_id}
					</td>
					<td class="p-2 w-fit">{section.name}</td>
					<td class="p-2">{section.grade_name}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<p>No classes to show!</p>
{/if}
