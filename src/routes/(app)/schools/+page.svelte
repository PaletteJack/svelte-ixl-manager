<script>
    export let data;
    const { schools } = data;
</script>

<div class="flex items-center gap-4">
    <h1 class="text-2xl text-green-950 font-semibold">Select a School</h1>
    <a class="link" href="/schools/manage-schools">Manage Schools</a>
</div>
<hr class="mb-2" />

<div class="flex flex-col gap-2 mt-2 max-w-md mx-auto">
{#if schools.length > 0}
    {#each schools as school}
        <a class="text-center text-lg px-2 py-2 rounded-sm hover:bg-gray-100 hover:scale-[103%] transition-all duration-75" href="/schools/{school.id}/manage-classes">{school.name}</a>
    {/each}
{:else}
    <p>No schools to show! <a class="link" href="/admin">Load Data?</a></p>
{/if}
</div>