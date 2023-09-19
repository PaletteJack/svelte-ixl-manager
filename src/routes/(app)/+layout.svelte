<script>
	import "../../app.postcss";
	import Navbar from "$lib/components/Navbar.svelte";
	import Toast from "$lib/components/Toast.svelte";
</script>
  
<Toast />
<Navbar />
<div class="container mx-auto pt-6 px-4 md:px-0">
	<slot />
</div>