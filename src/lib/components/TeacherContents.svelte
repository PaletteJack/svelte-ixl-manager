<script>
	import AddSectionToTeacher from "../forms/AddSectionToTeacher.svelte";
	import { triggerModal } from "$lib/modalStore"
	export let user, sections, school;
	let selectedSections = [];
    let checkAllSections = false;

    const handleAllSections = () => {

        if (checkAllSections) {
			selectedSections = sections.map(s => s.id)
        } else {
            selectedSections = [];
        }
    }

	const addSection = async () => {

		const req = await fetch(`/api/get-school-sections?id=${school}`)

		const sections = await req.json();

		triggerModal({
			content: AddSectionToTeacher,
			header: "Add Classes",
			props: {
				sections
			}
		})
	}

</script>

<div class="w-full px-4">
	<div id="student-wrapper" class="px-4">
		<div id="student-info">
			<div class="w-full py-2 flex flex-col gap-2">
				<p>User ID: {user.id}</p>
				<p>Name: {user.first_name} {user.last_name}</p>
				<p>Email: {user.email}</p>
			</div>
		</div>
	</div>

	<div class="w-full flex gap-4 mb-4">
		<button class="btn add-btn" on:click={addSection}>Add Classes</button>
		{#if selectedSections.length > 0}
			<button class="btn delete-btn">Delete Classes</button>
		{/if}
	</div>

	<div id="student-enrollments-wrapper" class="px-4">
		<div id="student-enrollments">
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
			{/if}
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
