export interface IUser{
    id:string,
    name:string ,
    password:string
    email:string ,
    role:"Admin" | "Observer" | "Drvier" | "Worker"
}