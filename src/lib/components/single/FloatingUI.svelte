<script>
    import { slide } from "svelte/transition";
    let showThing = false
    const showSomthing = () => showThing = !showThing;
</script>


<button 
type="button" 
class="w-12 h-12 rounded-full bg-green-300 shadow-lg fixed bottom-8 right-12 grid place-items-center"
on:click={showSomthing}
>
    <p class="text-3xl font-semibold">?</p>
</button>

{#if showThing}
<div class="w-full py-2 bg-red-500 text-white text-center" transition:slide>
    <p>This is a high priority message</p>
</div>
{/if}