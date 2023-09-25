<script>
	import "../../app.postcss";
	import Navbar from "$lib/components/Navbar.svelte";
	import Toast from "$lib/components/single/Toast.svelte";
	import Modal from "$lib/components/single/Modal.svelte";
	import Drawer from "$lib/components/single/Drawer.svelte";
	import FloatingUi from "$lib/components/single/FloatingUI.svelte";
</script>
  
<!-- <FloatingUi /> -->
<Toast />
<Modal />
<Drawer />
<Navbar />
<div class="container mx-auto pt-6 px-4 md:px-0">
	<slot />
</div>