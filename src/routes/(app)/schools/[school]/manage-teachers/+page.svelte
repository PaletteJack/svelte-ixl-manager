<script>
	import TeacherContents from "$lib/components/TeacherContents.svelte";
	import DeleteTeacher from "$lib/forms/teachers/DeleteTeacher.svelte";
	import AddTeacher from "$lib/forms/teachers/AddTeacher.svelte";
	import { triggerDrawer, closeDrawer, triggerModal } from "$lib/stores.js";
	import { teacherDataStore } from "$lib/dataStore";
	import { onDestroy } from "svelte";
	export let data;
	const { school } = data;
	$: teachers = data.teachers

	let selectedTeachers = [];
	let allTeachers = false;

	const changeAllTeachers = () => {
		if (allTeachers) {
			selectedTeachers = teachers.map(t => t.id);
		} else {
			selectedTeachers = [];
		}
	}

	const handleDrawer = async (teacher) => {
		const req = await fetch(`/api/get-teacher?id=${teacher.id}`)

		const teacherData = await req.json();
		teacherDataStore.set(teacherData);

		triggerDrawer({
			content: TeacherContents,
			props: {
				user: teacher,
				school: school.id
			}
		});

	};

	const newTeacher = () => {
		triggerModal({
			content: AddTeacher,
			header: "Create new teacher",
			props: {
				schoolID: school.id
			}
		})
	}

	const deleteTeacher = () => {
		triggerModal({
			content: DeleteTeacher,
			header: "Are you sure?",
			props: {
				teachers: selectedTeachers
			}
		})
	}

	onDestroy(() => {
		closeDrawer()
	})
	
</script>

<div class="w-full flex gap-4 mb-4">
	<button class="btn-sm btn-p" on:click={newTeacher}>Add</button>
	{#if selectedTeachers.length > 0}
	<button class="btn-sm btn-s" on:click={deleteTeacher}>Delete</button>
	{/if}
</div>
{#if teachers.length > 0}
	<table class="table-auto w-full border-collapse max-h-[750px] overflow-y-auto">
		<thead>
			<tr class="bg-green-900 text-white text-left sticky top-0">
				<th class="p-2"><input
					class="mr-4"
					type="checkbox"
					bind:checked={allTeachers}
					on:change={changeAllTeachers}
					/>First Name</th>
				<th class="p-2">Last Name</th>
				<th class="p-2">Email</th>
			</tr>
		</thead>
		<tbody>
			{#each teachers as teacher}
				<tr
					class="even:bg-green-100 hover:bg-gray-200 hover:cursor-pointer"
					on:click={() => handleDrawer(teacher)}
				>
					<td class="p-2">
						<input
							class="mr-4"
							type="checkbox"
							value={teacher.id}
							bind:group={selectedTeachers}
							on:click|stopPropagation
						/>
						{teacher.first_name}
					</td>
					<td class="p-2">{teacher.last_name}</td>
					<td class="p-2">{teacher.email}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<p>No Teachers to show!</p>
{/if}