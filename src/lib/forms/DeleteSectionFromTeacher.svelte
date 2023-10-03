<script>
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { closeModal } from "$lib/modalStore";
    import { triggerToast } from "$lib/toastStore";
    import { teacherDataStore } from "$lib/teacherDataStore"
    export let sections;
    export let teacherID;


    const submitForm = ({formElement, formData, action, cancel, submitter}) => {

        return async ({ result, update }) => {
            closeModal();
            switch(result.type) {
                case 'success':
                    formElement.reset();
                    teacherDataStore.set(result.data.newData);
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
<form action="?/deleteSectionsFromTeacher" method="POST" use:enhance={submitForm}>
    <input type="hidden" value={sections} name="sections">
    <input type="hidden" value={teacherID} name="teacher_id">
    <div class="w-full flex flex-row-reverse gap-4 mt-6">
        <button
        class="btn bg-red-500 hover:bg-red-400 text-white"
        >
            Unassign Teachers
        </button>
    </div>
</form>