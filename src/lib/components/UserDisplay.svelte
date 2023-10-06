<script>
    import UserCircle from "$lib/svgs/UserCircle.svelte";
</script>

<div class="flex gap-2 items-center mt-4">
    <slot name="icon">
        <UserCircle styles="w-10 h-10 text-green-800" />
    </slot>
	<p class="text-xl font-semibold">
        <slot name="display">
            <span>No Display</span>
        </slot>
    </p>
</div>