<script>
    import { closeModal, triggerToast } from "$lib/stores.js";
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    let inputValue = ''
    export let school;
    $: isValid = inputValue === school.name;

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

<p>Are you sure you want to delete this school? All associated classes, teachers, and students will be deleted.<br> Type in <span class="text-red-500">"{school.name}"</span> to confirm deletion.</p>
<form action="?/deleteSchool" method="POST" use:enhance={submitForm}>
    <input type="hidden" name="school" value={school.id}>
    <div class="w-full flex gap-4 my-4">
        <input class="input border-2 border-red-300 focus:outline-none" bind:value={inputValue} type="text" name="confirmation">
        <button 
        class="btn-lg btn-del"
        class:diabled-button={!isValid}
        disabled={!isValid}
        >
            Delete Database
        </button>
    </div>
</form>