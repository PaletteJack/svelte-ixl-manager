<script>
	// import SchoolContents from '$lib/components/ClassContents.svelte';
	// import AddSchool from '$lib/forms/AddSection.svelte';
	// import DeleteSchool from '$lib/forms/DeleteSection.svelte';
	import { triggerDrawer, closeDrawer, triggerModal } from '$lib/stores.js';
	import { onDestroy } from 'svelte';
	// import { schoolDataForm } from "$lib/dataStore";
	export let data;
	const { grades } = data;
	let selectedGrades = [];
	let addAllGrades = false;

	const changeAllGrades = () => {
		if (addAllGrades) {
			selectedGrades = grades.map(g => g.id);
		} else {
			selectedGrades = [];
		}
	}

	const handleDrawer = async (section) => {
		const req = await fetch(`/api/get-section-users?id=${section.id}`)

		const classData = await req.json();
		classDataStore.set(classData);

		triggerDrawer({
			content: ClassContents,
			header: section.name,
			props: {
				school: school,
				section: section.id
			}
		});
	};

	const newSection = () => {

		triggerModal({
			content: AddSection,
			header: "New Section",
			props: {
				schoolID: school.id,
				grades: grades
			}
		})
	}

	const deleteSections = () => {
		if (selectedGrades.length > 0) {
			triggerModal({
				content: DeleteSection,
				header: "Are you sure?",
				props: {
					section_ids: selectedClasses
				}
			})
		} else {
			alert("No sections selected");
		}
	}

	onDestroy(() => {
		closeDrawer();
	})
    
</script>

<div class="w-full flex gap-4 mb-4">
	<button
		id="classroom-add-class"
		class="btn-sm btn-p"
		on:click={newSection}
	>
		Add
	</button>
	{#if selectedGrades.length > 0}
		<button 
		id="classroom-delete-class" 
		class="btn-sm btn-s"
		on:click={deleteSections}
		>
			Delete
		</button>
	{/if}
</div>
{#if grades.length != 0}
	<table class="table-auto w-full border-collapse max-h-[725px] overflow-y-auto">
		<thead>
			<tr class="bg-green-900 text-white text-left sticky top-0">
				<th class="p-2"><input
					class="mr-4"
					type="checkbox"
					bind:checked={addAllGrades}
					on:change={changeAllGrades}
					/></th>
				<th class="p-2">Name</th>
				<th class="p-2">Value</th>
			</tr>
		</thead>
		<tbody>
			{#each grades as grade}
				<tr
					class="section-row even:bg-green-100 hover:bg-gray-200 hover:cursor-pointer last:pb-4"
					on:click={() => handleDrawer(grade)}
				>
					<td class="p-2 flex items-center">
						<input
							class="mr-4"
							type="checkbox"
							value={grade.id}
							bind:group={selectedGrades}
							on:click|stopPropagation
						/>
					</td>
					<td class="p-2 w-fit">{grade.name}</td>
					<td class="p-2">{grade.value}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<p>No grades to show!</p>
{/if}
