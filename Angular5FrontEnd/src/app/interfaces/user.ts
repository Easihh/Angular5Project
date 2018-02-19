import { Role } from "./role";

export interface User {
    id: number;
    username: string;
    role:Role;
    postCount:number;
}