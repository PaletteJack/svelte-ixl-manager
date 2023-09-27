<script>
    export let sectionID;
    export let teachers;
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { closeModal } from "$lib/modalStore";
    import { triggerToast } from "$lib/toastStore";

    const submitForm = ({formElement, formData, action, cancel, submitter}) => {

        return async ({ result, update }) => {
            closeModal();
            switch(result.type) {
                case 'success':
                    formElement.reset();
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
<form action="?/addTeacherToSection" method="POST" use:enhance={submitForm}>
    <input class="input" type="hidden" value={sectionID} name="section">
    <div class="w-full flex flex-col gap-4">
        <select multiple name="teacher" class="input focus:outline-none border-2 border-black rounded-sm">
            {#each teachers as teacher}
            <option value={teacher.id}>{teacher.first_name} {teacher.last_name}</option>
            {/each}
        </select>
        <div class="w-full flex flex-row-reverse mt-4">
            <button class="btn bg-green-500 hover:bg-green-400 text-white">
                Add Teachers
            </button>
        </div>
    </div>
</form>
{:else}
<p>There are no teachers in this school. <a href="#!" class="link">Add teachers?</a></p>
{/if}