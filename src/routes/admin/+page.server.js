import Papa from 'papaparse'


/** @type {import('./$types').Actions} */
export const actions = {
    submitFiles: async ({ request, locals: { db }}) => {
        const formData = await request.formData()
        const files = formData.getAll('csvs');
        
        for (const file of files) {
            console.log(file);
            // const content = await file.text();
            // const parsedData = Papa.parse(content, {
            //     header: true,
            //     dynamicTyping: true
            // })

            // console.log(parsedData);
        }
    }
};