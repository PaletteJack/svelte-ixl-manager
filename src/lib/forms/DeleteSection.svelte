<script>
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { closeModal } from "../modalStore";
    import { triggerToast } from "../toastStore";
    export let section_ids;

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

<p>Are you sure you want to delete the selected section(s)? This action cannot be undone.</p>
<form action="?/deleteSections" method="POST" use:enhance={submitForm}>
    <input type="hidden" value={section_ids} name="ids">
    <div class="w-full flex flex-row-reverse gap-4 mt-6">
        <button
        class="btn bg-red-500 hover:bg-red-400 text-white"
        >
            Delete Sections
        </button>
    </div>
</form>