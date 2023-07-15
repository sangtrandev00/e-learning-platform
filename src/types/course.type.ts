import { ISection } from './lesson.type';

export enum AccessStatus {
  PAID = 'PAID',
  DRAFT = 'DRAFT',
  COMMING_SOON = 'COMMING_SOON',
  ENROLLMENT_CLOSED = 'ENROLLMENT_CLOSED',
  FREE = 'FREE',
  PRIVATE = 'PRIVATE'
}

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT'
}

export interface ICourse {
  _id: string; // youtube id
  name: string;
  description: string;
  price: number;
  finalPrice: number;
  access: AccessStatus;
  level: CourseLevel;
  thumbnail: string;
  courseSlug: string;
  cateId: string; // id of Lập trình/Khoa học máy tính
  userId: string; // FK
  sectionList: ISection[];
  usersEntrolled?: {
    // Learners
    userId: string;
    lessonDone: number; // Thời gian tới bao nhiêu là để biết học sinh done khóa đó, phần này có nên sinh ra một bảng nữa hay không!
    dateStart: string;
  }[];
  createAt: string;
  updatedAt: string;
}

// When is use is enrolled ? (bought the course, click enroll if course is free)
