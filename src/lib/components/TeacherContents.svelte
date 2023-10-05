<script>
	import AddSectionToTeacher from "$lib/forms/teachers/AddSectionToTeacher.svelte";
	import DeleteSectionFromTeacher from "$lib/forms/teachers/DeleteSectionFromTeacher.svelte";
	import { triggerModal } from "$lib/stores.js"
	import { teacherDataStore } from "$lib/teacherDataStore"
	import { onDestroy } from "svelte";
	export let user, school;
	let selectedSections = [];
    let checkAllSections = false;
	let teacherData;

	const unsubscribe = teacherDataStore.subscribe(value => {
		teacherData = value;
	})

	$: sections = teacherData

    const handleAllSections = () => {

        if (checkAllSections) {
			selectedSections = sections.map(s => s.id)
        } else {
            selectedSections = [];
        }
    }

	const addSection = async () => {

		const req = await fetch(`/api/get-teacher-unassigned-sections?school_id=${school}&teacher_id=${user.id}`)

		const sections = await req.json();

		triggerModal({
			content: AddSectionToTeacher,
			header: "Add Classes",
			props: {
				sections,
				teacherID: user.id
			}
		})
	}

	const deleteSection = async () => {

		triggerModal({
			content: DeleteSectionFromTeacher,
			header: "Are you sure?",
			props: {
				sections: selectedSections,
				teacherID: user.id
			}
		})
	}

	onDestroy(unsubscribe)

</script>

<div class="w-full py-2 flex flex-col gap-2">
	<p>Teacher ID: {user.teacher_id}</p>
	<p>{user.first_name} {user.last_name}</p>
	<p>{user.email}</p>
	<p>{user.username}</p>
</div>

<div class="w-full flex gap-4 mb-4">
	<button class="btn add-btn" on:click={addSection}>Add Classes</button>
	{#if selectedSections.length > 0}
		<button class="btn delete-btn" on:click={deleteSection}>Delete Classes</button>
	{/if}
</div>

{#if sections.length > 0}
<div class="w-full flex flex-col">
	<table class="table-auto w-full border-collapse max-h-[725px] overflow-y-auto">
		<thead>
			<tr class="text-left">
				<th class="p-2">
					<input
					class=""
					type="checkbox"
					bind:checked={checkAllSections}
					on:change={handleAllSections}
					/>
				</th>
				<th class="p-2 font-semibold">Classroom ID</th>
				<th class="p-2 font-semibold">Grade</th>
			</tr>
		</thead>
		<tbody>
			{#each sections as classroom}
				<tr class="even:bg-green-100">
					<td class="p-2">
						<input
							class=""
							type="checkbox"
							value={classroom.id}
							bind:group={selectedSections}
						/>
					</td>
					<td class="p-2">{classroom.section_id}</td>
					<td class="p-2">{classroom.grade_name}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
{:else}
<p>No classes assigned to this teacher.</p>
{/if}

<style lang="postcss">
	.add-btn {
		@apply border-2 border-solid border-green-500 hover:bg-green-500 hover:text-white;
	}

	.delete-btn {
		@apply border-2 border-solid border-red-500 hover:bg-red-500 hover:text-white;
	}
</style>
