<script>
    import Logo from "$lib/components/Logo.svelte";
</script>

<div class="p-4 pt-6 bg-[#0C4B33] min-w-[24rem] max-w-[30rem] rounded-md shadow-lg">
    <div class="w-full flex justify-center">
        <Logo />
    </div>
    <form action="?/login" method="POST">
        <p class="text-gray-100 mb-3 text-2xl">Login</p>
        <div class="flex flex-col gap-4">
            <input class="px-2 py-1" type="text" name="username" placeholder="username">
            <input class="px-2 py-1" type="password" name="password" placeholder="password">
            <button type="submit" class="btn bg-gray-100 hover:bg-gray-50 !w-full">Login</button>
        </div>
    </form>
</div>