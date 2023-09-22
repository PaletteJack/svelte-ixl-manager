<script>
	import Papa from 'papaparse';
	import JSZip from 'jszip';
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { validateRow, templates, validateCSV } from '$lib/csvValidation.js';
	import { downloadBlob } from '$lib/utils.js';
	import { triggerModal } from '$lib/modalStore';
	import { triggerToast } from '$lib/toastStore';
	import Upload from '$lib/svgs/Upload.svelte';
	import Check from '$lib/svgs/Check.svelte';
	import X from '$lib/svgs/X.svelte';
	import ErrorList from '$lib/components/ErrorList.svelte';
	import ResetData from '$lib/forms/ResetData.svelte';

	let files = [];
	let fileInput;
	let csvFiles = templates
		.map((item) => {
			return item.filename;
		})
		.sort();

	$: containsAllFiles = csvFiles.every((expectedFile) =>
		files.some((file) => file.filename === expectedFile)
	);
	$: filesValid = !files.every((file) => file.isValid);
	$: uploadValid = containsAllFiles && filesValid;

	const downloadTemplates = async () => {
		const zip = new JSZip();

		templates.forEach((file) => {
			const csv = Papa.unparse([file.headers]);
			zip.file(file.filename, csv);
		});

		const blob = await zip.generateAsync({ type: 'blob' });
		downloadBlob(blob, 'templates.zip');
	};

	const updateFiles = async () => {
		const fileList = Array.from(fileInput.files);
		const promises = [];

		fileList.forEach((file) => {
			const promise = new Promise((resolve, reject) => {
				let fileErrors = [];
				let validHeaders = false;

				Papa.parse(file, {
					dynamicTyping: true,
					skipEmptyLines: true,
					step: function (result, parser) {
						const row = result.data;

						if (!validHeaders) {
							validHeaders = true;
							const headerResults = validateCSV(file.name, result.data);
							if (headerResults.isValid) {
								validHeaders = headerResults.isValid;
								return;
							} else {
								fileErrors.push(...headerResults.errors);
								parser.abort();
								return;
							}
						}

						const rowErrors = validateRow(file.name, row);
						if (rowErrors.length > 0) {
							fileErrors.push(...rowErrors);
						}
					},
					complete: function () {
						if (fileErrors.length > 0) {
							files = [...files, { filename: file.name, valid: false, errors: fileErrors }];
						} else {
							files = [...files, { filename: file.name, valid: true }];
						}
						resolve();
					}
				});
			});

			promises.push(promise);
		});

		await Promise.all(promises).then(() => {
			const missingFiles = checkMissingFiles();
			files = [...files, ...missingFiles];
			return;
		});
	};

	const checkMissingFiles = () => {
		let missingFiles = [];

		csvFiles.forEach((expectedFile) => {
			const exists = files.some((file) => file.filename == expectedFile);
			if (!exists) {
				missingFiles.push({
					filename: expectedFile,
					valid: false,
					errors: [
						{
							type: 'Missing file',
							message: `The file ${expectedFile} is missing`
						}
					]
				});
			}
		});

		return missingFiles;
	};

	const clearForm = () => {
		files = [];
		fileInput.value = '';
	};

	const showErrors = (file) => {
		triggerModal({ content: ErrorList, header: file.filename, props: { errors: file.errors } });
	};

	const databaseReset = () => {
		triggerModal({ content: ResetData, header: 'Are you sure?' });
	};

	const submitForm = ({ formElement, formData, action, cancel, submitter }) => {
		return async ({ result, update }) => {
			// const submissionResults = [...result.data.errors]
			// console.log(submissionResults);
			switch (result.type) {
				case 'success':
					formElement.reset();
					await applyAction(result);
					await invalidateAll();
					triggerToast({ message: 'Uploaded data successfully', bg: 'bg-green-500' });
					break;
				case 'failure':
					triggerToast.Page({
						message: 'There was a problem uploading your data.',
						bg: 'bg-red-500'
					});
					break;
				default:
					break;
			}
		};
	};
</script>

<style lang="postcss">
	.custom-label-button {
		@apply cursor-pointer flex flex-col gap-2 items-center justify-center border-dashed border-gray-400 border-2 w-64 h-52;
	}
</style>

<h1 class="text-3xl text-green-950">Load Data</h1>
<hr class="mb-2" />

<div class="w-full pb-4">
	<section class="w-full">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<p class="my-2">
			Upload a list of initial schools, teachers, enrollments and sections.
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button class="link p-0 cursor-pointer" on:click={downloadTemplates}
				>Download templates</button
			>
		</p>
		<form
			action="?/submitFiles"
			method="POST"
			enctype="multipart/form-data"
			use:enhance={submitForm}
		>
			<div class="grid w-full place-items-center min-h-[31.25rem]">
				{#if files.length != 0}
					<div class="flex flex-col">
						{#each files as file}
							<div class="py-2 w-full grid grid-cols-[160px_1fr_auto] gap-6 items-center">
								<div>
									<p class="text-lg font-semibold">{file.filename}</p>
								</div>

								<div>
									{#if file.errors}
										{#if file.errors[0].type === 'Missing file'}
											<p class="text-red-500">This file is missing!</p>
										{:else}
											<button
												type="button"
												class="text-red-500 underline"
												on:click={() => showErrors(file)}
											>
												Click to view errors.
											</button>
										{/if}
									{:else}
										<p class="text-green-600">File is valid!</p>
									{/if}
								</div>

								<div>
									{#if file.valid}
										<Check styles="text-green-500 w-6 h-6" />
									{:else}
										<X styles="text-red-500 w-6 h-6" />
									{/if}
								</div>
							</div>
							<hr />
						{/each}
					</div>
				{/if}
				<div class="flex flex-col gap-6 items-center mt-4" class:hidden={files.length != 0}>
					<label for="file-upload" class="custom-label-button">
						<div class="rounded-full bg-gray-800 text-white p-2">
							<Upload styles="w-8 h-8" />
						</div>
						<span>Upload Files</span></label
					>
					<input
						bind:this={fileInput}
						id="file-upload"
						type="file"
						class="hidden"
						name="csvs"
						multiple="multiple"
						accept="text/csv, .csv"
						on:change={updateFiles}
					/>
				</div>
			</div>
			<div class="w-full flex flex-row-reverse gap-4">
				<button
					type="submit"
					disabled={!uploadValid}
					class="btn bg-green-300 hover:bg-green-200"
					class:diabled-button={!uploadValid}
				>
					Submit Files
				</button>
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
		<hr class="border-green-700 mb-2" />
		<p class="my-2">Delete all records in the database.</p>
		<button class="btn text-white bg-red-500 hover:bg-red-400" on:click={databaseReset}
			>Reset Database</button
		>
	</section>
</div>