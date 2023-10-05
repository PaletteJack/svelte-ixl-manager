<script>
	import ClassContents from '$lib/components/ClassContents.svelte';
	import AddSection from '$lib/forms/sections/AddSection.svelte';
	import DeleteSection from '$lib/forms/sections/DeleteSection.svelte';
	import { triggerModal, triggerDrawer, closeDrawer } from '$lib/stores.js';
	import { classDataStore } from "$lib/classDataStore.js";
	import { onDestroy } from 'svelte';
	export let data;
	const { school } = data;
	$: classes = data.classes;
	const grades = data.streamed.grades
	let selectedClasses = [];
	let addAllClasses = false;

	const changeAllClasses = () => {
		if (addAllClasses) {
			selectedClasses = classes.map(c => c.id);
		} else {
			selectedClasses = [];
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
		if (selectedClasses.length > 0) {
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
		class="btn w-btn bg-green-500 hover:bg-green-400 text-white"
		on:click={newSection}
	>
		Add
	</button>
	{#if selectedClasses.length > 0}
		<button 
		id="classroom-delete-class" 
		class="btn w-btn bg-red-500 hover:bg-red-400 text-white"
		on:click={deleteSections}
		>
			Delete
		</button>
	{/if}
</div>
{#if classes.length != 0}
	<table class="table-auto w-full border-collapse max-h-[725px] overflow-y-auto">
		<thead>
			<tr class="bg-green-900 text-white text-left sticky top-0">
				<th class="p-2"><input
					class="mr-4"
					type="checkbox"
					bind:checked={addAllClasses}
					on:change={changeAllClasses}
					/>
				Section
					 ID</th>
				<th class="p-2">Name</th>
				<th class="p-2">Grade</th>
			</tr>
		</thead>
		<tbody>
			{#each classes as section}
				<tr
					class="section-row even:bg-green-100 hover:bg-gray-200 hover:cursor-pointer last:pb-4"
					on:click={() => handleDrawer(section)}
				>
					<td class="p-2 flex items-center">
						<input
							class="mr-4"
							type="checkbox"
							value={section.id}
							bind:group={selectedClasses}
							on:click|stopPropagation
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
