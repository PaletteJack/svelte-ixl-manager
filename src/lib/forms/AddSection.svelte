<script>
    export let schoolID;
    export let grades;
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { closeModal } from "../modalStore";
    import { triggerToast } from "../toastStore";

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

<form action="?/addSection" method="POST" use:enhance={submitForm}>
    <input class="input" type="hidden" value={schoolID} name="school">
    <div class="w-full flex flex-col gap-4">
        <div class="w-full flex gap-4">
            <input class="input" type="text" name="section_id" placeholder="Section ID">
            <input class="input" type="text" name="section_name" placeholder="Name">
        </div>
        <div class="w-full flex gap-4">
            <input class="input" type="text" name="subject" placeholder="Subject (optional)">
            <select name="grade" class="input">
                {#each grades as grade}
                <option value={grade.value}>{grade.name}</option>
                {/each}
            </select>
        </div>
        <div class="w-full flex flex-row-reverse mt-4">
            <button class="btn bg-green-500 hover:bg-green-400 text-white">
                Create Section
            </button>
        </div>
    </div>
</form>