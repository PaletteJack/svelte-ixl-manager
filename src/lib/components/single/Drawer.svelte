<script>
	import { drawer, closeDrawer } from '$lib/stores.js';
	import { scale } from 'svelte/transition';
</script>

<style lang="postcss">
	.drawer {
		@apply fixed top-0 right-0 h-full w-full lg:w-6/12 my-[81px] overflow-y-auto z-30 bg-green-50 shadow-xl pb-6;
	}

	.drawer-header {
		@apply flex flex-row-reverse items-center pr-8 py-3 absolute top-0 right-0 w-full;
	}

	.drawer-content {
        @apply w-full px-4 overflow-y-auto pb-4;
        max-height: calc(100% - 2.5rem);
    }

	.close-btn {
		@apply font-semibold text-xl w-6 h-6 flex items-center justify-center rounded-full p-5 hover:scale-[101%] hover:shadow-lg transition-all bg-gray-900 text-white;
	}
</style>

{#if $drawer.active}
	<div class="drawer" in:scale={{duration: 300, opacity: 0.5, start: 0.5}} out:scale={{duration: 200, opacity: 0.3, start: 0.4}}>
		<div class="drawer-header">
			<button class="close-btn" on:click={closeDrawer}> X </button>
		</div>

        <div class="drawer-content">
            <svelte:component this={$drawer.content}  {...$drawer.props}/>
        </div>
	</div>
{/if}
