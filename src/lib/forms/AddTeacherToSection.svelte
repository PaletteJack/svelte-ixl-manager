<script>
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { closeModal } from "$lib/modalStore";
    import { triggerToast } from "$lib/toastStore";
    import { classDataStore } from "$lib/classDataStore"
    export let sectionID;
    export let teachers;
    
    let selectedTeachers = [];
    let checkAllTeachers = false;

    const handleAllTeachers = () => {

        if (checkAllTeachers) {
			selectedTeachers = teachers.map(t => t.id)
        } else {
            selectedTeachers = [];
        }
    }

    const submitForm = ({formElement, formData, action, cancel, submitter}) => {

        return async ({ result, update }) => {
            closeModal();
            switch(result.type) {
                case 'success':
                    formElement.reset();
                    classDataStore.set(result.data.newData);
                    await applyAction(result);
                    await invalidateAll();
                    triggerToast({message: result.data.message, bg: "bg-green-500"})
                    break;
                case 'failure':
                    triggerToast({message: result.data.message, bg: "bg-red-500"})
                    break;
                default:
                    break;
            }
        }
    }
</script>

{#if teachers.length > 0}
<table class="table-auto w-full border-collapse max-h-[725px] overflow-y-auto">
    <thead>
        <tr class="text-left">
            <th class="p-2">
                <input
                class=""
                type="checkbox"
                bind:checked={checkAllTeachers}
                on:change={handleAllTeachers}
                />
            </th>
            <th class="p-2 font-semibold">Name</th>
            <th class="p-2 font-semibold">Email</th>
        </tr>
    </thead>
    <tbody>
        {#each teachers as teacher}
            <tr class="even:bg-green-100">
                <td class="p-2 flex items-center">
                    <input
                        class=""
                        type="checkbox"
                        value={teacher.id}
                        bind:group={selectedTeachers}
                    />
                </td>
                <td class="p-2 w-fit">{teacher.first_name} {teacher.last_name}</td>
                <td class="p-2">{teacher.email}</td>
            </tr>
        {/each}
    </tbody>
</table>
<form action="?/addTeacherToSection" method="POST" use:enhance={submitForm}>
    <input type="hidden" value={sectionID} name="section">
    <input type="hidden" value={selectedTeachers} name="teachers">
    <div class="w-full flex flex-row-reverse mt-4">
        <button class="btn bg-green-500 hover:bg-green-400 text-white">
            Add Teachers
        </button>
    </div>
</form>
{:else}
<p>There are no teachers left to add. <a href="#!" class="link">Add teachers?</a></p>
{/if}