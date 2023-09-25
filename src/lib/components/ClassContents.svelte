<script>
	export let classData;
	$: teachers = classData.teachers;
	$: students = classData.students;
	let tab = 0;
	const changeTab = (id) => {
		tab = id;
	};
</script>

<div class="w-full px-4">
	<div class="tab w-full">
		<div class="flex gap-0">
			<button class="px-4 py-2 m-0" class:open-tab={tab == 0} on:click={() => changeTab(0)}>
				Teachers
			</button>
			<button class="px-4 py-2 m-0" class:open-tab={tab == 1} on:click={() => changeTab(1)}>
				Students
			</button>
		</div>
		<hr class="mt-2 mb-4" />
	</div>

	{#if tab == 0}
		<div id="Teachers" class="px-4 tabcontent">
			<div class="flex gap-2 mb-2">
				<button class="btn add-btn"> Add Teacher </button>
				<button class="btn delete-btn"> Unassign Teachers </button>
			</div>
			<div id="teacher-list">
				{#if teachers.length > 0}
					{#each teachers as teacher}
						<div class="w-full py-2 flex justify-between items-center">
							<div class="flex gap-2 items-center">
								<input class="teacher-checkbox" type="checkbox" value={teacher.id} />
								<p>{teacher.first_name} {teacher.last_name}</p>
							</div>
							<p>{teacher.email}</p>
						</div>
					{/each}
				{:else}
					<p>No teachers assigned to this section.</p>
				{/if}
			</div>
		</div>
	{:else if tab == 1}
		<div id="Students" class="px-4 tabcontent">
			<div class="flex gap-2 mb-2">
				<button class="btn add-btn"> Add Student </button>
				<button class="btn delete-btn"> Unassign Students </button>
			</div>

			<div id="student-list">
				{#if students.length > 0}
					{#each students as student}
						<div class="w-full py-2 flex justify-between items-center">
							<div class="flex gap-2 items-center">
								<input class="teacher-checkbox" type="checkbox" value={student.id} />
								<p>{student.first_name} {student.last_name}</p>
							</div>
							<p>{student.email}</p>
						</div>
					{/each}
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
