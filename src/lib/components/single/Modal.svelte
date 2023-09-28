<script>
    import { modal, closeModal } from '$lib/modalStore.js';
	import X from "$lib/svgs/X.svelte"
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
	class="custom-width rounded-md border-0 p-0 backdrop:bg-black/30 {modalStyles}"
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="px-4 pb-4">
		<div class="w-full flex justify-between sticky top-0 pt-4 pb-2 bg-white">
			<h2 class="text-2xl font-semibold">
				{$modal.header}
			</h2>
			<button autofocus on:click={closeModal}>
				<X styles="w-8 h-8"/>
			</button>
		</div>
		<hr class="mt-2" />
        <div class="pt-4">
            {#if contentComponent}
			<svelte:component this={contentComponent}  {...$modal.props}/>
			{/if}
        </div>
	</div>
</dialog>

<style lang="postcss">
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.custom-width {
		width: min(38rem, 100%);
		max-height: 30rem;
	}

	@keyframes zoom {
		from {
			transform: scale(0.80);
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
