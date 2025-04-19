export interface IUser {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_picture: string | null;
    role: string;
    bio: string | null;
    dcc: string;
}
