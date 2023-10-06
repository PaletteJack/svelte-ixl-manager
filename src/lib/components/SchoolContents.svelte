<script>
	import Chart from "chart.js/auto"
	import Library from "../svgs/Library.svelte";
	import UserDisplay from "$lib/components/UserDisplay.svelte"
	import { onMount } from "svelte";
	import InfoBox from "./InfoBox.svelte";
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

<UserDisplay>
	<Library slot="icon" styles="w-10 h-10 text-green-800" />
	<span slot="display">{school.name}</span>
</UserDisplay>

<div class="w-full py-2 flex flex-col gap-2">
	<div class="w-full grid grid-cols-2 p-4">
		<div class="custom-grid">
			<InfoBox>
				<span slot="label">School ID</span>
				<span slot="info">{school.school_id}</span>
			</InfoBox>
			<InfoBox>
				<span slot="label">License Type</span>
				<span slot="info">{school.license_type}</span>
			</InfoBox>
			<InfoBox>
				<span slot="label">License Cap</span>
				<span slot="info">{school.license_cap}</span>
			</InfoBox>
			{#if student_count}
				{#if school.license_cap - student_count >= 0}
					<InfoBox>
						<span slot="label">Licenses Remaining</span>
						<span slot="info" class="text-green-600">{school.license_cap - student_count}</span>
					</InfoBox>
				{:else}
					<InfoBox>
						<span slot="label" class="text-red-500">Licenses Over</span>
						<span slot="info">{Math.abs(school.license_cap - student_count)}</span>
					</InfoBox>
				{/if}
			{/if}
			<InfoBox>
				<span slot="label">Students</span>
				<span slot="info">{student_count}</span>
			</InfoBox>
			<InfoBox>
				<span slot="label">Teachers</span>
				<span slot="info">{teacher_count}</span>
			</InfoBox>
			<InfoBox>
				<span slot="label">Classrooms</span>
				<span slot="info">{section_count}</span>
			</InfoBox>
		</div>
		<div class="">
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

	.custom-grid {
		@apply flex gap-2 flex-wrap;
	}

	.custom-grid > * {
		flex: 1 1 33%;
	}
</style>
