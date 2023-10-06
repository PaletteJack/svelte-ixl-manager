<script>
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { closeModal, triggerToast } from "$lib/stores.js";
    export let schoolID;
    export let grades;

    const submitForm = ({formElement, formData, action, cancel, submitter}) => {

        return async ({ result, update }) => {
            closeModal();
            switch(result.type) {
                case 'success':
                    formElement.reset();
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

<form action="?/addSection" method="POST" use:enhance={submitForm}>
    <input class="input" type="hidden" value={schoolID} name="school">
    <div class="w-full flex flex-col gap-4">
        <div class="w-full flex gap-4">
            <input class="input" type="text" name="section_id" placeholder="Section ID" required>
            <input class="input" type="text" name="section_name" placeholder="Name" required>
        </div>
        <div class="w-full flex gap-4">
            <input class="input" type="text" name="subject" placeholder="Subject (optional)">
            <select name="grade" class="input">
                {#each grades as grade}
                <option value={grade.id}>{grade.name}</option>
                {/each}
            </select>
        </div>
        <div class="w-full flex flex-row-reverse mt-4">
            <button class="btn btn-p">
                Create Section
            </button>
        </div>
    </div>
</form>