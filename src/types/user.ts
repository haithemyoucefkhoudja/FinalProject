
/*
"id": int,
        "username": string,
        "email": string,
        "company": string,
        "warehouse": string,
        "role": string
*/
export interface IUser{
    id:number,
    username:string ,
    password:string
    email:string ,
    company:string,
    warehouse:string,
    role:"Admin" | "Observer" | "Drvier" | "Worker"
}