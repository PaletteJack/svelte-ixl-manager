<script>
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { closeModal, triggerToast } from "$lib/stores.js";
    export let schoolID;
    export let grades;

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

<form action="?/addStudent" method="POST" use:enhance={submitForm}>
    <input class="input" type="hidden" value={schoolID} name="school">
    <div class="w-full flex flex-col gap-4">
        <div class="w-full flex gap-4">
            <input class="input" type="text" name="first_name" placeholder="First Name" required>
            <input class="input" type="text" name="last_name" placeholder="Last Name" required>
        </div>
        <div class="w-full flex gap-4">
            <input class="input" type="email" name="email" placeholder="Email">
            <select name="grade" class="input" required>
                {#each grades as grade}
                <option value={grade.id}>{grade.name}</option>
                {/each}
            </select>
        </div>
        <p class="text-lg">Optional Fields <span class="text-green-700">(these fields default to email)</span></p>
        <hr>
        <div class="w-full flex gap-4">
            <input class="input" type="text" name="username" placeholder="Username">
            <input class="input" type="text" name="student_id" placeholder="Student ID">
        </div>
        <div class="w-full flex gap-4">
            <input class="input" type="text" name="student_number" placeholder="Student Number">
        </div>
        <div class="w-full flex flex-row-reverse mt-4">
            <button class="btn bg-green-500 hover:bg-green-400 text-white">
                Add Student
            </button>
        </div>
    </div>
</form>