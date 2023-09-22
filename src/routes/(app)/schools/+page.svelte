<script>
    export let data;
    const { schools } = data;
</script>

<h1 class="text-3xl text-green-950">Select a School</h1>
<hr class="mb-2" />

<div class="flex flex-col gap-2 mt-2">
{#if schools.length > 0}
    {#each schools as school}
        <a class="link" href="/schools/{school.id}/manage-classes">{school.name}</a>
    {/each}
{:else}
    <p>No schools to show! <a class="link" href="/admin">Load Data?</a></p>
{/if}
</div>