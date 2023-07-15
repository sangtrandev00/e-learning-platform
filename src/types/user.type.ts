export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER'
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  address: string;
  avatar: string;
  tags?: string[];
  providerId?: string; // maybe improve later
  resetToken?: string;
  resetTokenExpiration?: string;
  loginToken?: string;
  loginTokenExpiration?: string;
}
