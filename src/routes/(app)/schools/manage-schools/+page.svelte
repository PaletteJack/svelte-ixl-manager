<script>
	import SchoolContents from '$lib/components/SchoolContents.svelte';
	import AddSchool from '$lib/forms/schools/AddSchool.svelte';
	import { triggerDrawer, closeDrawer, triggerModal } from '$lib/stores.js';
	import { onDestroy } from 'svelte';
	// import { schoolDataStore } from "$lib/dataStore";
	export let data;
	$: schools = data.schools;

	const handleDrawer = async (school) => {
		const req = await fetch(`/api/get-school-data?id=${school.id}`)
		const schoolData = await req.json();

		triggerDrawer({
			content: SchoolContents,
			props: {
				school: school,
				countData: schoolData
			}
		});
	};

	const newSchool = () => {
		triggerModal({
			content: AddSchool,
			header: "New School"
		})
	}

	onDestroy(() => {
		closeDrawer();
	})

</script>

<div class="w-full flex gap-4 mb-4">
	<button
		id="classroom-add-class"
		class="btn-sm btn-p"
		on:click={newSchool}
	>
		Add
	</button>
</div>
{#if schools.length != 0}
	<table class="table-auto w-full border-collapse max-h-[725px] overflow-y-auto">
		<thead>
			<tr class="bg-green-900 text-white text-left sticky top-0">
				<th class="p-2">
				School ID</th>
				<th class="p-2">Name</th>
				<th class="p-2">License Type</th>
			</tr>
		</thead>
		<tbody>
			{#each schools as school}
				<tr
					class="section-row even:bg-green-100 hover:bg-gray-200 hover:cursor-pointer last:pb-4"
					on:click={() => handleDrawer(school)}
				>
					<td class="p-2 flex items-center">
						{school.school_id}
					</td>
					<td class="p-2 w-fit">{school.name}</td>
					<td class="p-2">{school.license_type}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<p>No Schools to show!</p>
{/if}
