<script>
	import AddSectionToTeacher from "$lib/forms/teachers/AddSectionToTeacher.svelte";
	import DeleteSectionFromTeacher from "$lib/forms/teachers/DeleteSectionFromTeacher.svelte";
	import InfoBox from "./InfoBox.svelte";
	import UserDisplay from "./UserDisplay.svelte";
	import { triggerModal } from "$lib/stores.js"
	import { teacherDataStore } from "$lib/dataStore"
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

<UserDisplay>
	<span slot="display">{user.first_name} {user.last_name}</span>
</UserDisplay>
<div class="w-full py-4 flex gap-2 overflow-x-auto">
	<InfoBox>
		<span slot="label">Teacher ID</span>
		<span slot="info">{user.teacher_id}</span>
	</InfoBox>
	<InfoBox>
		<span slot="label">Email</span>
		<span slot="info">{user.email}</span>
	</InfoBox>
	<InfoBox>
		<span slot="label">Username</span>
		<span slot="info">{user.username}</span>
	</InfoBox>
</div>

<div class="w-full flex gap-4 mb-4">
	<button class="btn-sm btn-p" on:click={addSection}>Add Classes</button>
	{#if selectedSections.length > 0}
		<button class="btn-sm btn-t" on:click={deleteSection}>Delete Classes</button>
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
				<tr class="even:bg-green-100 text-green-900">
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