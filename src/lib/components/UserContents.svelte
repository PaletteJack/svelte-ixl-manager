<script>
	export let user, sections;
	console.log(sections);
</script>

<div class="w-full px-4">
	<div id="student-wrapper" class="px-4">
		<div id="student-info">
			<div class="w-full py-2 flex flex-col gap-2">
				<p>User ID: {user.id}</p>
				<p>Name: {user.first_name} {user.last_name}</p>
				<p>Email: {user.email}</p>
				<!-- <p>School: ${user.school}</p> -->
			</div>
		</div>
	</div>

	<div class="w-full flex gap-4 mb-4">
		<button class="btn add-btn">Add Section</button>
		<button class="btn delete-btn">Delete Section</button>
	</div>

	<div id="student-enrollments-wrapper" class="px-4">
		<div id="student-enrollments">
			{#each sections as classroom}
				<div class="w-full py-2 flex justify-between items-center">
					<div class="flex gap-2 items-center">
						<input class="" type="checkbox" value={classroom.id} />
						<p>
							{classroom.grade_name} - <span class="font-semibold">ID: {classroom.section_id}</span>
						</p>
					</div>
					<p>{user.email}</p>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	.add-btn {
		@apply border-2 border-solid border-green-500 hover:bg-green-500 hover:text-white;
	}

	.delete-btn {
		@apply border-2 border-solid border-red-500 hover:bg-red-500 hover:text-white;
	}
</style>
