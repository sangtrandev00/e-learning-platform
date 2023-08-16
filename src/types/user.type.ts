import { ICourse } from './course.type';

export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  USER = 'USER'
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone: string;
  address?: string;
  avatar?: string;
  courses?: ICourse[];
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  tags?: string[];
  providerId?: string; // maybe improve later
  resetToken?: string;
  resetTokenExpiration?: string;
  loginToken?: string;
  loginTokenExpiration?: string;
}
