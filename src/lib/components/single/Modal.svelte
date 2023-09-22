<script>
    import { modal, closeModal } from '$lib/modalStore.js';
    let dialog;
	$: contentComponent = $modal.content
    $: if (dialog && $modal.active) dialog.showModal();
    $: if (dialog && !$modal.active) dialog.close();
	$: modalStyles = $modal.styles ?? ""
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	class="max-w-[36rem] rounded-md border-0 p-0 backdrop:bg-black/30 {modalStyles}"
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="p-4">
        <h2 class="text-2xl font-semibold">
            {$modal.header}
        </h2>
		<hr />
        <div class="py-4">
            {#if contentComponent}
			<svelte:component this={contentComponent}  {...$modal.props}/>
			{/if}
        </div>
		<div class="flex flex-row-reverse mt-2">
			<!-- svelte-ignore a11y-autofocus -->
			<button 
			class="btn w-btn bg-orange-600 hover:bg-orange-500 text-white"
			autofocus 
			on:click={closeModal}>
				Close
			</button>
		</div>
	</div>
</dialog>

<style>
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
