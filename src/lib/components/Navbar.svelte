<script>
    import { page } from "$app/stores"

    let open = false;
    const toggleMenu = () => open = !open
</script>

<style lang="postcss">
    .mobile-btn {
        @apply relative inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white;
    }

    .nav-link {
        @apply select-none text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium;
    }

    .nav-active {
        @apply bg-gray-900 text-white;
    }

</style>

<nav class="bg-[#0C4B33] sticky top-0 z-10 py-4" class:pb-0={open}>
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">

          <!-- Mobile menu button-->
          <button id="mobile-button" type="button" class="mobile-btn" on:click={toggleMenu}>
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            {#if !open}
            <svg id="hamburger-icon" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" >
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            {:else}
            <svg id="x-icon" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            {/if}
          </button>

        </div>

        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <h3 class="text-white pointer-events-none select-none">
              <span class="absolute top-0 -left-2 text-sm">Sveltekit ❤️</span><span class="text-2xl font-semibold">IXL Manager</span>
            </h3>
          </div>
          <div class="hidden sm:ml-6 sm:block w-full">
            <div class="flex space-x-4 w-full items-center justify-between">
              <div class="flex gap-4">
                <a href="/" class="nav-link" class:nav-active={$page.url.pathname == "/"}>Home</a>
                <a href="/schools" class="nav-link" class:nav-active={$page.url.pathname.includes("/schools")}>Schools</a>
                <a href="/admin" class="nav-link" class:nav-active={$page.url.pathname.includes("/admin")}>Admin</a>
              </div>
              <a href="/logout" class="nav-link" data-sveltekit-preload-data="off" data-sveltekit-reload>Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full" class:hidden={!open} id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2 bg-gray-800">
        <a href="/" class="block w-full nav-link" class:nav-active={$page.url.pathname == "/"}>Home</a>
        <a href="/schools" class="block w-full nav-link" class:nav-active={$page.url.pathname.includes("/schools")}>Schools</a>
        <a href="/admin" class="block w-full nav-link" class:nav-active={$page.url.pathname.includes("/admin")}>Admin</a>
        <a href="#!" class="block w-full nav-link">Log Out</a>
      </div>
    </div>
  </nav>