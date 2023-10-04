<script>
    export let school;
    export let countData;
    const { student_count, teacher_count, section_count } = countData;
    let ratio 
    
    if (student_count && teacher_count) {
        ratio = Math.round(student_count / teacher_count) 
    }

</script>

<div class="w-full px-4">
	<div class="px-4">
		<div>
			<div class="w-full py-2 flex flex-col gap-2">
				<p>School ID: {school.school_id}</p>
				<p>License Type: {school.license_type}</p>
                <p>{student_count} students</p>
                <p>{teacher_count} teachers</p>
                <p>{section_count} classrooms</p>
                {#if ratio}
                    <p>{ratio} students : 1 teacher</p>
                {/if}
			</div>
		</div>
	</div>

	<div class="w-full flex flex-col gap-4">
		<button class="btn add-btn" >Advance School Year</button>
		<button class="btn delete-btn">Delete School</button>
	</div>

	<div class="px-4">
		<div>

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
