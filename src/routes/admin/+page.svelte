<script>
    import Papa from "papaparse"
    import JSZip from "jszip"
    import { downloadBlob } from "$lib/utils.js"
    import { templates } from "$lib/utils.js"

    let files = [];
    let csvFiles = templates.map(item => {
        return item.filename;
    }).sort()

    $: matchingNames = files.length != 0 && files.sort().every((file, index) => file === csvFiles[index]);
    $: fileLength = files.length == csvFiles.length
    $: fileValid = matchingNames && fileLength

    const downloadTemplates = async () => {
        const zip = new JSZip();

        templates.forEach(file => {
            const csv = Papa.unparse([file.headers])
            zip.file(file.filename, csv);
        })

        const blob = await zip.generateAsync({ type: "blob" });
        downloadBlob(blob, "templates.zip");

    }

    const updateFiles = () => {
        const list = document.querySelector("#file-upload");
        const fileList = Array.from(list.files);
        files = fileList.map(file => file.name);
    }

</script>

<style lang="postcss">
    .diabled-button {
        @apply bg-gray-300 pointer-events-none
    }
</style>

<p class="text-2xl mb-4 font-semibold">Admin page</p>
<form action="?/submitFiles" method="POST" enctype="multipart/form-data" class="flex flex-col gap-4 w-fit mb-4">
    <div class="flex gap-4 items-center ">
        <label for="file-upload" class="px-2 py-1 bg-orange-500 cursor-pointer hover:bg-orange-400 hover:shadow-lg transition-all">Upload Files</label>
        <input id="file-upload" type="file" class="hidden" name="csvs" multiple="multiple" accept="text/csv, .csv" on:change={updateFiles}>
        {#if files.length != 0}
        <p>{files.length} files selected</p>
        {/if}
    </div>
    <button 
    type="submit" 
    disabled={!fileValid} 
    class="px-2 py-1 w-fit bg-green-300 rounded-sm hover:bg-green-200 hover:shadow-lg transition-all"
    class:diabled-button={!fileValid}
    >
    Submit Files
</button>
</form>

<button class="text-green-700 underline" on:click={downloadTemplates}>Download templates</button>