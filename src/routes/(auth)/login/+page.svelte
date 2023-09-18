<script>

</script>

<form action="?/login" method="POST">
    <p class="text-gray-100 mb-3 text-2xl">Login</p>
    <div class="flex flex-col gap-4">
        <input class="px-2 py-1" type="text" name="username" placeholder="username">
        <input class="px-2 py-1" type="password" name="password" placeholder="password">
        <button type="submit" class="btn bg-gray-100 hover:bg-gray-50 !w-full">Login</button>
    </div>
</form>
<p class="text-gray-100 text-xl w-full text-center my-4">Or</p>
<form action="?/createAccount" method="POST">
    <p class="text-gray-100 mb-3 text-2xl">Create an account</p>
    <div class="flex flex-col gap-4">
        <input class="px-2 py-1" type="text" name="first_name" placeholder="first name">
        <input class="px-2 py-1" type="text" name="last_name" placeholder="last name">
        <input class="px-2 py-1" type="password" name="password" placeholder="password">
        <button type="submit" class="btn bg-gray-100 hover:bg-gray-50 !w-full">Login</button>
    </div>
</form>