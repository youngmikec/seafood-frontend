import { User } from "./index";

interface LoginResponsePayload {
    token: string;
    User: User
}

export class LoginResponse {
    success?: boolean;
    payload?: LoginResponsePayload | any;
    message?: string;
}
