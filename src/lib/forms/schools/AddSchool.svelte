<script>
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { closeModal, triggerToast } from "$lib/stores.js";

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

<form action="?/addSchool" method="POST" use:enhance={submitForm}>
    <div class="w-full flex flex-col gap-4">
        <div class="w-full flex gap-4">
            <input class="input" type="number" name="school_id" placeholder="School ID" required>
            <input class="input" type="text" name="name" placeholder="School Name" required>
        </div>
        <div class="w-full flex gap-4">
            <input class="input" type="text" name="initials" placeholder="School Domain/Initials">
            <input class="input" type="text" name="license_type" placeholder="License Type (optional)">
        </div>
        <div class="w-full flex gap-4">
            <input class="input" type="number" name="license_cap" placeholder="License Cap">
        </div>
        <div class="w-full flex flex-row-reverse mt-4">
            <button class="btn-sm btn-p">
                Create School
            </button>
        </div>
    </div>
</form>