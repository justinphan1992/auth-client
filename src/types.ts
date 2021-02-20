export interface User {
  id: number,
  username: string,
  email: string,
  dob: string,
  created_at: string,
  updated_at: string,
}

export interface UserRegister {
  username: string,
  email: string,
  dob: string | null;
  password: string,
  password_confirmation: string,
}

export type RegisterFormFields = "username" | "email" | "dob" | "password" | "password_confirmation"