<script>
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { closeModal } from "$lib/modalStore";
    import { triggerToast } from "$lib/toastStore";
    import { classDataStore } from "$lib/classDataStore"
    export let sectionID;
    export let teachers;


    const submitForm = ({formElement, formData, action, cancel, submitter}) => {

        return async ({ result, update }) => {
            closeModal();
            switch(result.type) {
                case 'success':
                    formElement.reset();
                    classDataStore.set(result.data.newData);
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

<p>Are you sure you want to unassign the selected teacher(s)?</p>
<form action="?/deleteTeachers" method="POST" use:enhance={submitForm}>
    <input type="hidden" value={sectionID} name="section">
    <input type="hidden" value={teachers} name="teachers">
    <div class="w-full flex flex-row-reverse gap-4 mt-6">
        <button
        class="btn bg-red-500 hover:bg-red-400 text-white"
        >
            Unassign Teachers
        </button>
    </div>
</form>