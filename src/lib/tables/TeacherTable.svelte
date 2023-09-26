<script>
    export let teachers;
    let selectedTeachers = [];
    let checkAll = false;

    const handleAllCheckboxes = () => {
        const inputs = document.querySelectorAll(".teacher-row");

        if (checkAll) {
            inputs.forEach(input => {
                selectedTeachers = [...selectedTeachers, input.value]
                input.checked = true;
            });
            console.log("should be all teachers -> ", selectedTeachers);
        } else {
            selectedTeachers = [];
            inputs.forEach(input => input.checked = false);
            console.log("should be empty -> ", selectedTeachers);
        }
    }

</script>

<table class="table-auto w-full border-collapse max-h-[725px] overflow-y-auto">
    <thead>
        <tr class="text-left">
            <th class="p-2">
                <input
                class="mr-4"
                type="checkbox"
                bind:checked={checkAll}
                on:change={handleAllCheckboxes}
                />
            </th>
            <th class="p-2">Name</th>
            <th class="p-2">Email</th>
        </tr>
    </thead>
    <tbody>
        {#each teachers as teacher, i}
            <tr class="even:bg-green-100">
                <td class="p-2 flex items-center">
                    <input
                        class="teacher-row mr-4"
                        type="checkbox"
                        value={teacher.id}
                        bind:group={selectedTeachers}
                    />
                </td>
                <td class="p-2 w-fit">{teacher.first_name} {teacher.last_name}</td>
                <td class="p-2">{teacher.email}</td>
            </tr>
        {/each}
    </tbody>
</table>