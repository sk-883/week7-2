import zod from 'zod'
import jwt from 'jsonwebtoken';
export function Signup(obj){
    const schema=zod.object({
        id:zod.string(),
        password:zod.string()
    })
    return schema.safeParse(obj)
}
export function payment(obj){
    const schema=zod.object({
        amount:zod.number().gt(0)

    })
    return schema.safeParse(obj)
}
export function purchase(obj){   
    const schema=zod.object({
        book_id:zod.string(),
        quantity:zod.number().gt(0)

    })
    return schema.safeParse(obj)
}

export function add(obj){   
    const schema=zod.object({
        book_id:zod.string(),
        price:zod.number().gt(0),
        quantity:zod.number().gt(0)

    })
    return schema.safeParse(obj)
}


