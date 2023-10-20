<script>
	import { page } from '$app/stores';
</script>

<style>
    .err-container {
        width: 100%;
        height: 100vh;
        display: grid;
        place-items: center;
        margin-top: -5rem;
        background-color: rgb(240 253 244);
    }

    .err-wrapper {
        display: flex;
        max-width: min(600px, 100%) !important;
        flex-direction: column;
        gap: 2rem;
    }

    .cat-img {
        max-width: min(600px, 100%);
    }

    .custom-link {
        display: inline-block;
        width: fit-content;
        color: rgb(21 128 61);
        font-size: x-large;
    }

</style>

<div class="err-container">
    <div class="err-wrapper">
        <img class="cat-img" src="https://httpcats.com/{$page.status}.jpg" alt="{$page.status}">
        <a class="custom-link" href="/">Go Home</a>
    </div>
</div>