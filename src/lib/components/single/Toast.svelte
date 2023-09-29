<script>
    import { toast } from '$lib/toastStore.js';
    import { slide } from 'svelte/transition';

    $: toastBG = $toast.bg ?? "bg-[#333]"
    $: toastFontColor = $toast.fontColor ?? "text-white"
    $: toastStyles = $toast.styles ?? ""
    $: styles = `${toastBG} ${toastFontColor} ${toastStyles}`
</script>

<style lang="postcss">
    .toast {
        @apply min-w-[250px] text-center rounded-sm p-4 fixed z-50 bottom-8 right-9;
    }
</style>

{#if $toast.active}
    <div class="toast {styles}" transition:slide>
      {$toast.message}
    </div>
{/if}