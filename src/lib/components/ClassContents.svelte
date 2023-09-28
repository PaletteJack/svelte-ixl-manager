<script>
	import AddTeacherToSection from "$lib/forms/AddTeacherToSection.svelte";
	import AddStudentToSection from "$lib/forms/AddStudentToSection.svelte";
	import { triggerModal } from "$lib/modalstore"
	export let classData;
	export let section;
	export let school;
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
		const req = await fetch('/api/get-school-teachers', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ school_id: school.id, section_id: section })
		});

		const teachers = await req.json();

		triggerModal({
			content: AddTeacherToSection,
			header: "Add Teachers",
			props: {
				sectionID: section,
				teachers: teachers
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
		const req = await fetch('/api/get-school-students', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ school_id: school.id, section_id: section })
		});

		const students = await req.json();

		triggerModal({
			content: AddStudentToSection,
			header: "Add Students",
			props: {
				sectionID: section,
				students: students
			}
		})

	}

</script>

<div class="w-full px-4">
	<div class="tab w-full">
		<div class="flex gap-0">
			<button class="px-4 py-2 m-0" class:open-tab={tab == 0} on:click={() => tab = 0}>
				Teachers
			</button>
			<button class="px-4 py-2 m-0" class:open-tab={tab == 1} on:click={() => tab = 1}>
				Students
			</button>
		</div>
		<hr class="mt-2 mb-4" />
	</div>

	{#if tab == 0}
		<div id="Teachers" class="px-4 tabcontent">
			<div class="flex gap-2 mb-2">
				<button class="btn add-btn" on:click={addTeachers}>Add Teacher</button>
				{#if selectedTeachers.length > 0}
					<button class="btn delete-btn">Unassign Teachers</button>
				{/if}
			</div>
			<div id="teacher-list">
				<p class="text-xl mt-4 mb-2">Assigned Teachers</p>
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
								<tr class="even:bg-green-100">
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
			</div>
		</div>
	{:else if tab == 1}
		<div id="Students" class="px-4 tabcontent">
			<div class="flex gap-2 mb-2">
				<button class="btn add-btn" on:click={addStudents}> Add Student </button>
				{#if selectedStudents.length > 0}
					<button class="btn delete-btn">Unassign Students</button>
				{/if}
			</div>

			<div id="student-list">
				<p class="text-xl mt-4 mb-2">Assigned Students</p>
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
								<tr class="even:bg-green-100">
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
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.open-tab {
		@apply bg-gray-900 text-white;
	}

	.add-btn {
		@apply border-2 border-solid border-green-500 hover:bg-green-500 hover:text-white;
	}

	.delete-btn {
		@apply border-2 border-solid border-red-500 hover:bg-red-500 hover:text-white;
	}
</style>
