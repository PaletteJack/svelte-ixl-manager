<script>
	import StudentContents from "$lib/components/StudentContents.svelte";
	import { triggerModal } from "$lib/modalStore";
	import { triggerDrawer, closeDrawer } from "$lib/drawerStore";
	import { onDestroy } from "svelte";
	import { studentDataStore } from "$lib/studentDataStore.js";
	import AddStudent from "$lib/forms/AddStudent.svelte";
	import DeleteStudent from "$lib/forms/DeleteStudent.svelte";
	export let data;
	const { school } = data;
	const grades = data.streamed.grades
	$: students = data.students

	let selectedStudents = [];
	let allStudents = false;

	const changeAllStudents = () => {
		if (allStudents) {
			selectedStudents = students.map(s => s.id);
		} else {
			selectedStudents = [];
		}
	}

	const handleDrawer = async (student) => {
		const req = await fetch(`/api/get-student?id=${student.id}`)

		const studentData = await req.json();
		studentDataStore.set(studentData);

		triggerDrawer({
			content: StudentContents,
			header: `${student.first_name} ${student.last_name}`,
			props: {
				user: student,
				school: school.id
			}
		});

	};

	const newStudent = () => {
		triggerModal({
			content: AddStudent,
			header: "Create new student",
			props: {
				schoolID: school.id,
				grades
			}
		})
	}

	const deleteStudent = () => {
		triggerModal({
			content: DeleteStudent,
			header: "Are you sure?",
			props: {
				students: selectedStudents
			}
		})
	}

	onDestroy(() => {
		closeDrawer()
	})
	
</script>

<div class="w-full flex gap-4 mb-4">
	<button class="btn w-btn bg-green-500 hover:bg-green-400 text-white" on:click={newStudent}>Add</button>
	{#if selectedStudents.length > 0}
	<button class="btn w-btn bg-red-500 hover:bg-red-400 text-white" on:click={deleteStudent}>Delete</button>
	{/if}
</div>
{#if students.length > 0}
	<table class="table-auto w-full border-collapse max-h-[750px] overflow-y-auto">
		<thead>
			<tr class="bg-green-900 text-white text-left sticky top-0">
				<th class="p-2"><input
					class="mr-4"
					type="checkbox"
					bind:checked={allStudents}
					on:change={changeAllStudents}
					/>First Name</th>
				<th class="p-2">Last Name</th>
				<th class="p-2">Email</th>
			</tr>
		</thead>
		<tbody>
			{#each students as student}
				<tr
					class="even:bg-green-100 hover:bg-gray-200 hover:cursor-pointer"
					on:click={() => handleDrawer(student)}
				>
					<td class="p-2">
						<input
							class="mr-4"
							type="checkbox"
							value={student.id}
							bind:group={selectedStudents}
							on:click|stopPropagation
						/>
						{student.first_name}
					</td>
					<td class="p-2">{student.last_name}</td>
					<td class="p-2">{student.email}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<p>No Students to show!</p>
{/if}