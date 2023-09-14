<script>
	export let showModal;
	let dialog;
	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog
	bind:this={dialog}
	class="max-w-[36rem] rounded-sm border-0 p-0 backdrop:bg-black/30"
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation class="p-4">
		<slot name="header" />
		<hr />
		<slot />
		<hr />
		<div class="flex flex-row-reverse mt-2">
			<button class="btn block bg-orange-600 hover:bg-orange-500 text-white" autofocus on:click={() => dialog.close()}>close modal</button>
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
