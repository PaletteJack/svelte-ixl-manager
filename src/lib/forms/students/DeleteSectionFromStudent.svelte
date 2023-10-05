<script>
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { closeModal, triggerToast } from "$lib/stores.js";
    import { studentDataStore } from "$lib/studentDataStore"
    export let sections;
    export let studentID;


    const submitForm = ({formElement, formData, action, cancel, submitter}) => {

        return async ({ result, update }) => {
            closeModal();
            switch(result.type) {
                case 'success':
                    formElement.reset();
                    studentDataStore.set(result.data.newData);
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

<p>Are you sure you want to unassign the selected classes?</p>
<form action="?/deleteSectionsFromStudent" method="POST" use:enhance={submitForm}>
    <input type="hidden" value={sections} name="sections">
    <input type="hidden" value={studentID} name="student_id">
    <div class="w-full flex flex-row-reverse gap-4 mt-6">
        <button
        class="btn bg-red-500 hover:bg-red-400 text-white"
        >
            Unassign Students
        </button>
    </div>
</form>