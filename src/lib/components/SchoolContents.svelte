<script>
	import Chart from "chart.js/auto"
	import { onMount } from "svelte";
    export let school;
    export let countData;
    const { student_count, teacher_count, section_count } = countData;
    let ratio
	let chart
	
	if (student_count && teacher_count) {
		ratio = Math.round(student_count / teacher_count) 
	}

	onMount(() => {

		const data = {
			labels: [
				"Students",
				"Teachers"
			],
			datasets: [{
				label: "Student : Teacher Ratio",
				data: [ratio, 1],
				backgroundColor:[
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)'
				],
				hoverOffset: 4
			}]
		}

		const config = {
			type: "doughnut",
			data: data
		}

		new Chart(chart, config);
		
	})
    

</script>

<div class="w-full py-2 flex flex-col gap-2">
	<div class="w-full flex gap-2">
		<div class="flex flex-col justify-center items-center gap-4 flex-1">
			<p>School ID: {school.school_id}</p>
			<p>License Type: {school.license_type}</p>
			{#if student_count}
				{#if school.license_cap - student_count >= 0}
					<p class="text-green-600">{school.license_cap - student_count} licenses remaining</p>
				{:else}
					<p class="text-red-600">{Math.abs(school.license_cap - student_count)} licenses over</p>
				{/if}
			{/if}
			<p>License Cap: {school.license_cap}</p>
			<p>{student_count} students</p>
			<p>{teacher_count} teachers</p>
			<p>{section_count} classrooms</p>
		</div>
		<div class="flex-1">
			{#if ratio}
			<canvas bind:this={chart} id="ratioChart"></canvas>
			{:else}
				<p>No Students!</p>
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


<style lang="postcss">
	.add-btn {
		@apply border-2 border-solid border-green-500 hover:bg-green-500 hover:text-white;
	}

	.delete-btn {
		@apply border-2 border-solid border-red-500 hover:bg-red-500 hover:text-white;
	}
</style>
