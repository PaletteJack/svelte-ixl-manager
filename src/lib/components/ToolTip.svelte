<script>
    import { fly } from 'svelte/transition';
    export let tooltip = ''
    export let position
    export let styles = ''
    let isHovered = false;
    let classValues
    let styleValues
    let direction

    function mouseOver() {
        isHovered = true;
    }

    function mouseLeave() {
        isHovered = false;
    }

    switch (position) {
        case 'top':
            classValues = "-top-11 left-2/4 -translate-x-2/4"
            styleValues = ""
            direction = {y:-15, duration: 150}
            break;
        case 'bottom':
            classValues = "-bottom-11 left-2/4 -translate-x-2/4"
            styleValues = ""
            direction = {y:15, duration: 150}
            break;
        case 'right':
            classValues = "top-2/4 -translate-y-2/4"
            styleValues = "left: calc(100% + 15px);"
            direction = {x:15, duration: 150}
            break;
        case 'left':
            classValues = "top-2/4 -translate-y-2/4"
            styleValues = "right: calc(100% + 15px);"
            direction = {x:-15, duration: 150}
            break;
        default:
            break;
    }


</script>

<div 
class="relative w-fit hover:cursor-default" 
on:mouseenter={mouseOver} 
on:mouseleave={mouseLeave}
>
    <slot/>
    {#if isHovered}
    <div 
    class="px-4 py-2 z-99 absolute min-w-[12rem] shadow-lg rounded-sm {classValues} {styles}"
    style="{styleValues}"
    transition:fly="{direction}"
    >
        {tooltip}
    </div>
    {/if}
</div>