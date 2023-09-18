// export async function GET({ request, cookies, locals: { db } }) {

// }

export async function POST({ request, cookies, locals: { db} }) {
    const body = await request.json();
    console.log(body);
    // const body = Object.fromEntries(await request.formData());
    // console.log("api function", body);
    
    return new Response(200, {
        message: "ok"
    })
} 