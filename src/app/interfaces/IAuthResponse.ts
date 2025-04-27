import { IUser } from "./IUser";

export interface IAuthResponse {
    message: string;
    user: IUser;
    //maybe add IUser here?
}

