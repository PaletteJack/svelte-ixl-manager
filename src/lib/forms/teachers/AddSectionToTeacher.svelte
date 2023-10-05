<script>
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { closeModal, triggerToast } from "$lib/stores.js";
    import { teacherDataStore } from "$lib/teacherDataStore.js"
    export let sections;
    export let teacherID;
    
    let selectedSections = [];
    let checkAllSections = false;

    const handleAllSections = () => {

        if (checkAllSections) {
			selectedSections = sections.map(s => s.id)
        } else {
            selectedSections = [];
        }
    }

    const submitForm = ({formElement, formData, action, cancel, submitter}) => {

        return async ({ result, update }) => {
            closeModal();
            switch(result.type) {
                case 'success':
                    formElement.reset();
                    teacherDataStore.set(result.data.newData);
                    await applyAction(result);
                    await invalidateAll();
                    triggerToast({message: result.data.message, bg: "success-toast"})
                    break;
                case 'failure':
                    triggerToast({message: result.data.message, bg: "fail-toast"})
                    break;
                default:
                    break;
            }
        }
    }
</script>

{#if sections.length > 0}
<table class="table-auto w-full border-collapse max-h-[725px] overflow-y-auto">
    <thead>
        <tr class="text-left">
            <th class="p-2">
                <input
                class=""
                type="checkbox"
                bind:checked={checkAllSections}
                on:change={handleAllSections}
                />
            </th>
            <th class="p-2 font-semibold">Section ID</th>
            <th class="p-2 font-semibold">Grade</th>
        </tr>
    </thead>
    <tbody>
        {#each sections as section}
            <tr class="even:bg-green-100">
                <td class="p-2 flex items-center">
                    <input
                        class=""
                        type="checkbox"
                        value={section.id}
                        bind:group={selectedSections}
                    />
                </td>
                <td class="p-2 w-fit">{section.section_id}</td>
                <td class="p-2">{section.grade_name}</td>
            </tr>
        {/each}
    </tbody>
</table>
<form action="?/addSectionToTeacher" method="POST" use:enhance={submitForm}>
    <input type="hidden" value={selectedSections} name="sections">
    <input type="hidden" value={teacherID} name="teacher_id">
    <div class="w-full flex flex-row-reverse mt-4">
        <button class="btn bg-green-500 hover:bg-green-400 text-white">
            Add Classes
        </button>
    </div>
</form>
{:else}
<p>There are no classes left to add. <a href="#!" class="link">Add classes?</a></p>
{/if}