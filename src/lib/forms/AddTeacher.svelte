<script>
    export let schoolID;
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { closeModal } from "$lib/modalStore";
    import { triggerToast } from "$lib/toastStore";

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

<form action="?/addTeacher" method="POST" use:enhance={submitForm}>
    <input class="input" type="hidden" value={schoolID} name="school">
    <div class="w-full flex flex-col gap-4">
        <div class="w-full flex gap-4">
            <input class="input" type="text" name="first_name" placeholder="First Name" required>
            <input class="input" type="text" name="last_name" placeholder="Last Name" required>
        </div>
        <div class="w-full flex gap-4">
            <input class="input" type="email" name="email" placeholder="Email">
        </div>
        <p class="text-lg">Optional Fields</p>
        <hr>
        <div class="w-full flex gap-4">
            <input class="input" type="text" name="username" placeholder="Username (defaults to email)">
            <input class="input" type="text" name="teacher_id" placeholder="Teacher ID (defaults to email)">
        </div>
        <div class="w-full flex flex-row-reverse mt-4">
            <button class="btn bg-green-500 hover:bg-green-400 text-white">
                Add Teacher
            </button>
        </div>
    </div>
</form>