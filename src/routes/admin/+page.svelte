<script>
    import Papa from "papaparse"
    import JSZip from "jszip"
    import Upload from "$lib/svgs/Upload.svelte";
    import Check from "$lib/svgs/Check.svelte";
    import X from "$lib/svgs/X.svelte";
    import { downloadBlob, templates, validateCSV } from "$lib/utils.js"

    let files = [];
    let fileInput;
    let csvFiles = templates.map(item => {
        return item.filename;
    }).sort()

    // $: matchingNames = files.length != 0 && files.sort().every((file, index) => file === csvFiles[index]);
    // $: fileLength = files.length == csvFiles.length
    // $: fileValid = matchingNames && fileLength

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
        const fileList = Array.from(fileInput.files);
        let count = 0;

        fileList.forEach(file => {
            Papa.parse(file, {
                complete: function(results) {
                    count++;
                    const csvResults = validateCSV(file.name, results.data)

                    if (csvResults.isValid) {
                        files = [...files, { filename: file.name, valid: true, }]
                    } else {
                        files = [...files, { filename: file.name, valid: false, errors: csvResults.errors }]
                    }

                    if (count === fileList.length) {
                        checkMissingFiles();
                    }
                }
            })
        });

    }

    const checkMissingFiles = () => {
        let missingFiles = [];

        csvFiles.forEach(expectedFile => {
            const exists = files.some(file => file.filename == expectedFile );
            if (!exists) {
                missingFiles.push({
                    filename: expectedFile,
                    valid: false,
                    errors: [{
                        type: "Missing file",
                        message: `The file ${expectedFile} is missing.`
                    }]
                })
            }
        })

        files = [...files, ...missingFiles]
    }

    const clearForm = () => {
        files = [];
        fileInput.value = "";
    }

</script>

<style lang="postcss">
    
    .custom-label-button {
        @apply cursor-pointer flex flex-col gap-2 items-center justify-center border-dashed border-gray-400 border-2 w-64 h-52
    }
</style>

<div class="w-full pb-4">
    <section class="w-full">
        <p class="text-2xl mt-2 font-semibold">Initial data</p>
        <hr class="border-green-700 mb-2">
        <p class="my-2">
            Upload a list of initial schools, teachers, enrollments and sections.
            <span class="link p-0 cursor-pointer" on:click={downloadTemplates}>Download templates</span>
        </p>
        <form action="?/submitFiles" method="POST" enctype="multipart/form-data">
            <div class="grid w-full place-items-center min-h-[31.25rem]">
                {#if files.length != 0}
                <div class="flex flex-col">
                    {#each files as file}
                    <!-- my plan is to add a linke here, which will open a modal with the list of errors per school. if the file does not have any errors, it will show a checkmark, else an X -->
                    <div class="py-2 w-full grid grid-cols-[160px_1fr_auto] gap-6 items-center">
                        <!-- Col with file name -->
                        <div>
                            <p class="text-lg font-semibold">{file.filename}</p>
                        </div>
                        <!-- Col with errors if any -->
                        <div>
                            {#if file.errors}
                                {#each file.errors as obj}
                                    <p class="text-red-500">{obj.type}. {obj.message}</p>
                                {/each}
                            {:else}
                                <p class="text-green-500">File is valid!</p>
                            {/if}
                        </div>
                        <!-- Col with icon for valid or not -->
                        <div>
                            {#if file.valid}
                                <Check styles="text-green-500 w-6 h-6" />
                            {:else}
                                <X styles="text-red-500 w-6 h-6" />
                            {/if}
                        </div>
                    </div>
                    <hr>
                    {/each}
                </div>
                {:else}
                    <div class="flex flex-col gap-6 items-center mt-4">
                        <label for="file-upload" class="custom-label-button">
                            <div class="rounded-full bg-gray-800 text-white p-2">
                                <Upload styles="w-8 h-8" />
                            </div>
                            <span>Upload Files</span></label>
                        <input bind:this={fileInput} id="file-upload" type="file" class="hidden" name="csvs" multiple="multiple" accept="text/csv, .csv" on:change={updateFiles}>
                    </div>
                {/if}
            </div>
            <div class="w-full flex flex-row-reverse gap-4">
                <button 
                type="submit" 
                class="btn bg-green-300 hover:bg-green-200"
                >
                    Submit Files
                </button>
                <!-- <button 
                type="submit" 
                disabled={!fileValid} 
                class="btn bg-green-300 hover:bg-green-200"
                class:diabled-button={!fileValid}
                >
                    Submit Files
                </button> -->
                <button
                type="button"
                class="btn text-white bg-orange-600 hover:bg-orange-500"
                on:click={clearForm}
                >
                Clear Form
                </button>
            </div>
        </form>
    </section>
    <section class="w-full">
        <p class="text-2xl mt-4 font-semibold">Reset Database</p>
        <hr class="border-green-700 mb-2">
        <p class="my-2">Delete all records in the database.</p>
        <button class="btn text-white bg-red-500 hover:bg-red-400">Reset Database</button>
    </section>
</div>