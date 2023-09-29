<script>
	import UserContents from "$lib/components/UserContents.svelte";
	import { triggerDrawer } from "$lib/drawerStore"
	export let data;
	const { school, teachers } = data;

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

		triggerDrawer({
			content: UserContents,
			header: `${teacher.first_name} ${teacher.last_name}`,
			props: {
				user: teacher,
				sections: teacherData
			}
		});

	};
</script>

<div class="w-full flex gap-4 mb-4">
	<button class="btn w-btn bg-green-500 hover:bg-green-400 text-white">Add</button>
	<button class="btn w-btn bg-red-500 hover:bg-red-400 text-white">Delete</button>
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
					class="teacher-row even:bg-green-100 hover:bg-gray-200 hover:cursor-pointer"
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