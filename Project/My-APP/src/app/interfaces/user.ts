export interface User {
    name:string
    email:string
    password:string
    phone:string
    age:number
    image?:string
    user_type:string
    status?:boolean
    tokens?:[
        {token:string}
    ]
}
