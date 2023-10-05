<script>
	import { page } from '$app/stores';
	import ArrowDown from '$lib/svgs/ArrowDown.svelte';
	const { school } = $page.data;
</script>

<div class="px-4 lg:px-0 flex flex-col w-full">
	<div>
		<div class="flex items-center gap-4">
			<a class="" href="/schools"><ArrowDown styles="w-6 h-6 rotate-90" /></a>
			<h1 class="section-header">{school.name}</h1>
		</div>
		<hr class="mb-4" />
	</div>
	<div class="grid grid-cols-[250px_1fr] gap-4 flex-1">
		<aside class="flex flex-col h-full items-start">
			<a
				class="nested-nav"
				class:nested-nav-active={$page.url.pathname.includes('/manage-classes')}
				href="/schools/{school.id}/manage-classes"
			>
				Classes
			</a>
			<a
				class="nested-nav"
				class:nested-nav-active={$page.url.pathname.includes('/manage-teachers')}
				href="/schools/{school.id}/manage-teachers"
			>
				Teachers
			</a>
			<a
				class="nested-nav"
				class:nested-nav-active={$page.url.pathname.includes('/manage-students')}
				href="/schools/{school.id}/manage-students"
			>
				Students
			</a>
		</aside>
		<div id="school-detail-content" class="max-h-[750px] overflow-y-auto">
			<slot />
		</div>
	</div>
</div>

<style lang="postcss">
	.nested-nav {
		@apply block w-full px-3 py-2 rounded-sm;
	}

	.nested-nav-active {
		@apply bg-gray-900 text-white;
	}
</style>
