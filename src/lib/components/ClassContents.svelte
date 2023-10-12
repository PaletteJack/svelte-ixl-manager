<script>
	import AddTeacherToSection from "$lib/forms/sections/AddTeacherToSection.svelte";
	import AddStudentToSection from "$lib/forms/sections/AddStudentToSection.svelte";
	import DeleteTeacherFromSection from "$lib/forms/sections/DeleteTeacherFromSection.svelte";
	import DeleteStudentFromEnrollment from "$lib/forms/sections/DeleteStudentFromEnrollment.svelte";
	import UserDisplay from "./UserDisplay.svelte";
	import { classDataStore } from "$lib/classDataStore.js"
	import { triggerModal } from "$lib/stores.js"
	import { onDestroy } from "svelte";
	import AcademicCap from "../svgs/AcademicCap.svelte";
	export let section;
	export let school;
	let classData;

	const unsubscribe = classDataStore.subscribe(value => {
		classData = value;
	})

	$: teachers = classData.teachers;
	$: students = classData.students;
	let tab = 0;

	// Teacher logic
	let selectedTeachers = [];
    let checkAllTeachers = false;

    const handleAllTeachers = () => {

        if (checkAllTeachers) {
			selectedTeachers = teachers.map(t => t.id)
        } else {
            selectedTeachers = [];
        }
    }

	const addTeachers = async () => {
		const req = await fetch(`/api/get-school-teachers?id=${school.id}&section=${section.id}`);

		const teachers = await req.json();

		triggerModal({
			content: AddTeacherToSection,
			header: "Add Teachers",
			props: {
				sectionID: section.id,
				teachers: teachers
			}
		})

	}

	const deleteTeachers = async () => {

		triggerModal({
			content: DeleteTeacherFromSection,
			header: "Are you sure?",
			props: {
				sectionID: section.id,
				teachers: selectedTeachers
			}
		})
	}

	// Students logic
	let selectedStudents = [];
    let checkAllStudents = false;

    const handleAllStudents = () => {

        if (checkAllStudents) {
			selectedStudents = students.map(s => s.id)
        } else {
            selectedStudents = [];
        }
    }

	const addStudents = async () => {
		const req = await fetch(`/api/get-school-students?id=${school.id}&section=${section.id}`);

		const students = await req.json();

		triggerModal({
			content: AddStudentToSection,
			header: "Add Students",
			props: {
				sectionID: section.id,
				students: students
			}
		})

	}

	const deleteStudents = async () => {

		triggerModal({
			content: DeleteStudentFromEnrollment,
			header: "Are you sure?",
			props: {
				sectionID: section.id,
				students: selectedStudents
			}
		})
	}

	onDestroy(unsubscribe)

</script>
<UserDisplay>
	<AcademicCap slot="icon" styles="w-10 h-10 text-green-800" />
	<span slot="display">{section.section_id}</span>
</UserDisplay>

<div class="w-full mt-4 mb-4">
	<div class="flex gap-0">
		<button class="px-4 py-2 m-0 border-b-2 border-b-transparent" class:open-tab={tab == 0} on:click={() => tab = 0}>
			Teachers
		</button>
		<button class="px-4 py-2 m-0 border-b-2 border-b-transparent" class:open-tab={tab == 1} on:click={() => tab = 1}>
			Students
		</button>
	</div>
</div>

{#if tab == 0}
	<div class="flex w-full gap-2 mb-4">
		<button class="btn-sm btn-p" on:click={addTeachers}>Add Teacher</button>
		{#if selectedTeachers.length > 0}
			<button class="btn-sm btn-t" on:click={deleteTeachers}>Unassign Teachers</button>
		{/if}
	</div>
	{#if teachers.length > 0}
	<div class="w-full flex flex-col">
		<table class="table-auto w-full border-collapse max-h-[725px] overflow-y-auto">
			<thead>
				<tr class="text-left">
					<th class="p-2">
						<input
						class=""
						type="checkbox"
						bind:checked={checkAllTeachers}
						on:change={handleAllTeachers}
						/>
					</th>
					<th class="p-2 font-semibold">Name</th>
					<th class="p-2 font-semibold">Email</th>
				</tr>
			</thead>
			<tbody>
				{#each teachers as teacher}
					<tr class="even:bg-green-100 text-green-900">
						<td class="p-2">
							<input
								class=""
								type="checkbox"
								value={teacher.id}
								bind:group={selectedTeachers}
							/>
						</td>
						<td class="p-2 w-fit">{teacher.first_name} {teacher.last_name}</td>
						<td class="p-2">{teacher.email}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	{:else}
		<p>No teachers assigned to this section.</p>
	{/if}
{:else if tab == 1}
	<div class="flex gap-2 mb-4">
		<button class="btn-sm btn-p" on:click={addStudents}> Add Student </button>
		{#if selectedStudents.length > 0}
			<button class="btn-sm btn-t" on:click={deleteStudents}>Unassign Students</button>
		{/if}
	</div>
	{#if students.length > 0}
	<div class="w-full flex flex-col">
		<!-- <TeacherTable {teachers}/> -->
		<table class="table-auto w-full border-collapse max-h-[725px] overflow-y-auto">
			<thead>
				<tr class="text-left">
					<th class="p-2">
						<input
						class=""
						type="checkbox"
						bind:checked={checkAllStudents}
						on:change={handleAllStudents}
						/>
					</th>
					<th class="p-2 font-semibold">Name</th>
					<th class="p-2 font-semibold">Email</th>
				</tr>
			</thead>
			<tbody>
				{#each students as student}
					<tr class="even:bg-green-100 text-green-900">
						<td class="p-2 flex items-center">
							<input
								class=""
								type="checkbox"
								value={student.id}
								bind:group={selectedStudents}
							/>
						</td>
						<td class="p-2 w-fit">{student.first_name} {student.last_name}</td>
						<td class="p-2">{student.email}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	{:else}
		<p>No students assigned to this section.</p>
	{/if}
{/if}

<style lang="postcss">
	.open-tab {
		@apply border-b-gray-900;
	}

</style>
