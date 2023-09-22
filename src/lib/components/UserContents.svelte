<script>
    export let user, sections;
</script>

<style lang="postcss">
    .add-btn {
		@apply border-2 border-solid border-green-500 hover:bg-green-500 hover:text-white;
	}

	.delete-btn {
		@apply border-2 border-solid border-red-500 hover:bg-red-500 hover:text-white;
	}
</style>

<div class="w-full px-4">

    <div id="student-wrapper" class="px-4">
      <div id="student-info">
        <div class="w-full py-2 flex flex-col gap-2">
            <p>Student ID: {user.id}</p>
            <p>Name: ${user.first_name} {user.last_name}</p>
            <p>Email: ${user.email}</p>
            <!-- <p>School: ${user.school}</p> -->
        </div>
      </div>
    </div>
    
    <div class="w-full flex gap-4 mb-4">
      <button class="btn add-btn">Add</button>
      <button class="delete-btn">Delete</button>
    </div>

    <div id="student-enrollments-wrapper" class="px-4">
      <div id="student-enrollments">
        {#each sections as classroom}
            <div class="w-full py-2 flex justify-between items-center">
                <div class="flex gap-2 items-center">
                    <input class="" type="checkbox" value={classroom.id} />
                    <p>{classroom.grade} - <span class="font-semibold">ID: {classroom.section_id}</span></p>
                </div>
                <p>{classroom.student_id}</p>
            </div>
        {/each}
      </div>
    </div>

  </div>