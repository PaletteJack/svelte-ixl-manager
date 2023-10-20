<script>
    let inputValue = ''
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { closeModal, triggerToast } from "$lib/stores.js";
    $: isValid = inputValue === "Delete Database";

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

<p>Type in <span class="text-red-500">"Delete Database"</span> to confirm you would like to reset all data. This action cannot be undone.</p>
<form action="?/resetDB" method="POST" use:enhance={submitForm}>
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