<script>
	import { page } from '$app/stores';
	import Hamburger from '../svgs/Hamburger.svelte';
	import XIcon from '../svgs/XIcon.svelte';
	import Logo from './Logo.svelte';
  import { slide } from 'svelte/transition';

	let open = false;
	const toggleMenu = () => open = !open;

	const handleNav = () => {
		if (open) {
			return (open = false);
		}
	};
</script>

<nav class="bg-[#0C4B33] sticky top-0 z-10 pt-4">
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button-->
				<button type="button" class="mobile-btn" on:click={toggleMenu}>
					{#if !open}
						<Hamburger />
					{:else}
						<XIcon />
					{/if}
				</button>
			</div>

			<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex flex-shrink-0 items-center">
					<Logo />
				</div>
				<div class="hidden sm:ml-6 sm:block w-full">
					<div class="flex space-x-4 w-full items-center justify-between">
						<div class="flex gap-4">
							<a href="/" class="nav-link" class:nav-active={$page.url.pathname == '/'}>Home</a>
							<a
								href="/schools"
								class="nav-link"
								class:nav-active={$page.url.pathname.includes('/schools')}>Schools</a
							>
							<a
								href="/admin"
								class="nav-link"
								class:nav-active={$page.url.pathname.includes('/admin')}>Admin</a
							>
						</div>
						<a
							href="/logout"
							class="nav-link"
							data-sveltekit-preload-data="off"
							data-sveltekit-reload>Logout</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>

  {#if open}
    <div class="w-full" transition:slide>
	  	<div class="space-y-1 px-2 pb-3 pt-2 bg-gray-800">
	  		<a
	  			href="/"
	  			class="block w-full nav-link"
	  			class:nav-active={$page.url.pathname == '/'}
	  			on:click={handleNav}>Home</a
	  		>
	  		<a
	  			href="/schools"
	  			class="block w-full nav-link"
	  			class:nav-active={$page.url.pathname.includes('/schools')}
	  			on:click={handleNav}>Schools</a
	  		>
	  		<a
	  			href="/admin"
	  			class="block w-full nav-link"
	  			class:nav-active={$page.url.pathname.includes('/admin')}
	  			on:click={handleNav}>Admin</a
	  		>
	  		<a
	  			href="/logout"
	  			class="block w-full nav-link"
	  			data-sveltekit-preload-data="off"
	  			data-sveltekit-reload>Log Out</a
	  		>
	  	</div>
	  </div>
  {/if}
</nav>

<style lang="postcss">
	.mobile-btn {
		@apply relative inline-flex items-center justify-center rounded-sm transition-all p-2 text-gray-200 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white;
	}

	.nav-link {
		@apply select-none text-gray-300 hover:bg-gray-700 hover:text-white rounded-sm px-3 py-2 text-sm font-medium transition-all;
	}

	.nav-active {
		@apply bg-gray-900 text-white;
	}
</style>
