export interface IUser {
    name: string;
    email: string;
    password: string;
    jobtitle?: string;
    avatarurl?:string;
    created_atDateTime: Date
    updated_atDateTime: Date
}