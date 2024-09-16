export type UserRole = 1 | 2 | 3

export interface User {
    id: number,
    login: string,
    password: string,
    name: string,
    balance: number,
    role?: UserRole
}

export interface LoggedUser{
    id: number,
    name: string,
    balance: number,
    email: string
}