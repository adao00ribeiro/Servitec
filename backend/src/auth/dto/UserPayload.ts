export interface UserPayload {

    sub: string;
    email: string;
    name: string;
    jobtitle: string;
    avatarurl:string;
    iat?: number;
    exp?: number;
}