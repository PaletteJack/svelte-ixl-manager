<script>
	import Library from "../svgs/Library.svelte";
	import UserDisplay from "$lib/components/UserDisplay.svelte"
	import InfoBox from "./InfoBox.svelte";
    export let school;
    export let countData;
    $: ratio = Math.round(countData.student_count / countData.teacher_count) ?? 0;
    
</script>

<UserDisplay>
	<Library slot="icon" styles="w-10 h-10 text-green-800" />
	<span slot="display">{school.name}</span>
</UserDisplay>

<div class="w-full flex mt-6 gap-2 overflow-x-auto">
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
	{#if countData.student_count}
	<InfoBox>
		<span slot="label">
			{school.license_cap - countData.student_count >= 0 ? "Licenses Remaining" : "Licenses Over"}
		</span>
		<span 
		slot="info"
		class:text-green-600={school.license_cap - countData.student_count >= 0}
		class:text-red-500={!(school.license_cap - countData.student_count >= 0)}
		>
			{Math.abs(school.license_cap - countData.student_count)}
		</span>
	</InfoBox>
	{/if}
	<InfoBox>
		<span slot="label">Students</span>
		<span slot="info">{countData.student_count}</span>
	</InfoBox>
	<InfoBox>
		<span slot="label">Teachers</span>
		<span slot="info">{countData.teacher_count}</span>
	</InfoBox>
	<InfoBox>
		<span slot="label">Classrooms</span>
		<span slot="info">{countData.section_count}</span>
	</InfoBox>
	<InfoBox>
		<span slot="label">Studen Ratio</span>
		<span slot="info">{ratio ? `${ratio} students : 1 teacher` : `No students`} </span>
	</InfoBox>
</div>
<p class="mt-4">Actions</p>
<hr class="mb-3 mt-1">
<div class="w-full flex gap-4">
	<button class="btn-lg btn-t" >Advance School Year</button>
	<button class="btn-lg btn-s">Delete School</button>
</div>

<div class="px-4">
	<div>

	</div>
</div>