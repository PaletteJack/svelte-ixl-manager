<script>
	import SimpleDrawer from '$lib/components/SimpleDrawer.svelte';
	export let data;
	const { school, teachers } = data;
	let showModal = false;
	const triggerModal = () => (showModal = true);
	const closeModal = () => (showModal = false);

	const selectItem = (id) => {
		console.log(id);
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
				<th class="p-2">First Name</th>
				<th class="p-2">Last Name</th>
				<th class="p-2">Email</th>
			</tr>
		</thead>
		<tbody>
			{#each teachers as teacher}
				<tr
					class="teacher-row even:bg-green-100 hover:bg-gray-200 hover:cursor-pointer"
					on:click={triggerModal}
				>
					<td class="p-2">
						<input
							class="mr-4"
							type="checkbox"
							value={teacher.id}
							on:click|stopPropagation={() => selectItem(teacher.id)}
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

<SimpleDrawer isOpen={showModal} {school} on:close={closeModal} />
