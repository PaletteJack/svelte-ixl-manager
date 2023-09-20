<script>
    export let errors = [];
</script>

<div class="flex flex-col">
    {#each errors as error}
    <div class="py-2 w-full grid grid-cols-[160px_1fr] gap-6 items-center">
        <p class="font-semibold">{error.type}</p>
        <p class="text-red-500">{error.message}</p>
    </div>
    <hr>
    {/each}
</div>