<script>
	import "../../app.postcss";
	import Navbar from "$lib/components/Navbar.svelte";
	import Toast from "$lib/components/Toast.svelte";
	import Modal from "../../lib/components/Modal.svelte";
</script>
  
<Toast />
<Modal />
<Navbar />
<div class="container mx-auto pt-6 px-4 md:px-0">
	<slot />
</div>