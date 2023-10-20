<script>
	import Logo from "$lib/components/Logo.svelte";

    let confirmPassword
    let password;

    $: matchingPasswords = password === confirmPassword;
</script>

<div class="p-4 pt-8 bg-[#0C4B33] min-w-[24rem] max-w-[30rem] rounded-md shadow-lg">
    <div class="w-full flex justify-center">
        <Logo />
    </div>
    <p class="my-6 text-gray-100">Welcome to Sveltekit IXL Manager! Fill out the form to create your first account! This user's username will be "<span class="text-yellow-300 underline">Admin</span>" and will have permissions to create and manage all aspects of IXL Manager.</p>
    <form action="?/createSuperUser" method="POST">
        <div class="flex flex-col gap-4">
            <input class="px-2 py-1" type="text" name="first_name" placeholder="First Name">
            <input class="px-2 py-1" type="text" name="last_name" placeholder="Last Name">
            <input bind:value={password} class="px-2 py-1" type="password" name="password" placeholder="Password">
            <input bind:value={confirmPassword} class="px-2 py-1" type="password" name="confirm-password" placeholder="Confirm Password">
            {#if (password && confirmPassword)}
                {#if matchingPasswords}
                    <p class="text-green-500">Passwords match</p>
                {:else}
                    <p class="text-red-500">Your passwords do not match</p>
                {/if}
            {/if}
            <button type="submit" class="py-1 bg-gray-100 hover:bg-green-100 w-full transition-colors">Create User</button>
        </div>
    </form>
</div>