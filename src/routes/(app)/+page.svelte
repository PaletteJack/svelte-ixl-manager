<script>
	import { goto } from "$app/navigation"
	import ToolTip from "$lib/components/ToolTip.svelte";
	export let data;
	const { schools, username, licenseCount } = data;
	let licenseTotals;
	if (schools.length > 0) {
		licenseTotals = `${licenseCount[0].license_type} - ${licenseCount[0].student_count}\n${licenseCount[1].license_type} - ${licenseCount[1].student_count}`;
	}

	export const navToSchool = (id) => {
		goto(`/schools/${id}/manage-classes`)
	}

</script>

<div class="px-4 lg:px-0">
	<h1 class="text-3xl text-green-950">License Counts</h1>
	<hr class="mb-2" />
	{#if schools.length != 0}
		<div class="w-full">
			<table class="table-auto w-full max-w-[800px] border-collapse max-h-[750px] overflow-y-auto">
				<thead>
					<tr class="bg-green-900 text-white text-left sticky top-0">
						<th class="p-2">School</th>
						<th class="p-2">Count</th>
						<th class="p-2">License Type</th>
					</tr>
				</thead>
				<tbody>
					{#each schools as school}
						<tr class="teacher-row even:bg-green-100 hover:bg-gray-100 hover:cursor-pointer" on:click={() => navToSchool(school.id)}>
							<td class="p-2">
								<div class="flex gap-4 items-center">
									{school.school_name}
								</div>
							</td>
							<td class="p-2">{school.license_type}</td>
							<td class="p-2 text-right pr-6">
								<span class="font-semibold">{school.student_count}</span>
							</td>
						</tr>
					{/each}
				</tbody>
				<tfoot class="bg-green-900 text-white">
					<tr>
						<td class="px-2 py-2 text-lg font-semibold">Total</td>
						<td class="px-2"></td>
						<td class="px-2 py-2 flex flex-row-reverse pr-6">
							<ToolTip tooltip={licenseTotals} position="right" styles="bg-green-300 text-gray-900 p-4">
								<span class="underline text-lg font-semibold">
									{licenseCount[0].student_count + licenseCount[1].student_count}
								</span>
							</ToolTip>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	{:else}
		<p>No data loaded yet. <a class="link" href="/admin">Load Data?</a></p>
	{/if}
</div>
