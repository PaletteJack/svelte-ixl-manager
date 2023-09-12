
export async function GET({ request, cookies, params, locals: { db } }) {
    const id = Number(params.id)

    const row = db.prepare('select * from section where id=?').get(id)
    
}