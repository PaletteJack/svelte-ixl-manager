<script>
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { closeModal, triggerToast } from "$lib/stores.js";
    import { classDataStore } from "$lib/dataStore"
    export let sectionID;
    export let students;

    const submitForm = ({formElement, formData, action, cancel, submitter}) => {

        return async ({ result, update }) => {
            closeModal();
            switch(result.type) {
                case 'success':
                    formElement.reset();
                    classDataStore.set(result.data.newData);
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

<p>Are you sure you want to unassign the selected students(s)?</p>
<form action="?/deleteStudents" method="POST" use:enhance={submitForm}>
    <input type="hidden" value={sectionID} name="section">
    <input type="hidden" value={students} name="students">
    <div class="w-full flex flex-row-reverse gap-4 mt-6">
        <button
        class="btn-sm btn-del"
        >
            Unassign Students
        </button>
    </div>
</form>