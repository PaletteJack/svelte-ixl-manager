<script>
    export let sectionID;
    export let students;
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { closeModal } from "$lib/modalStore";
    import { triggerToast } from "$lib/toastStore";
    import { classDataStore } from "$lib/classDataStore"

    let selectedStudents = [];
    let checkAllStudents = false;

    const handleAllStudents = () => {

        if (checkAllStudents) {
			selectedStudents = students.map(s => s.id)
        } else {
            selectedStudents = [];
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

{#if students.length > 0}    
<table class="table-auto w-full border-collapse max-h-[725px] overflow-y-auto">
    <thead>
        <tr class="text-left">
            <th class="p-2">
                <input
                class=""
                type="checkbox"
                bind:checked={checkAllStudents}
                on:change={handleAllStudents}
                />
            </th>
            <th class="p-2 font-semibold">Name</th>
            <th class="p-2 font-semibold">Email</th>
        </tr>
    </thead>
    <tbody>
        {#each students as student}
            <tr class="even:bg-green-100">
                <td class="p-2 flex items-center">
                    <input
                        class=""
                        type="checkbox"
                        value={student.id}
                        bind:group={selectedStudents}
                    />
                </td>
                <td class="p-2 w-fit">{student.first_name} {student.last_name}</td>
                <td class="p-2">{student.email}</td>
            </tr>
        {/each}
    </tbody>
</table>
<form action="?/addEnrollment" method="POST" use:enhance={submitForm}>
    <input type="hidden" value={sectionID} name="section">
    <input type="hidden" value={selectedStudents} name="students">
    <div class="w-full flex flex-row-reverse mt-4">
        <button class="btn bg-green-500 hover:bg-green-400 text-white">
            Add Students
        </button>
    </div>
</form>
{:else}
<p>There are no students left to add. <a href="#!" class="link">Add students?</a></p>
{/if}