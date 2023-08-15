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
  _id: string;
  name: string;
  subTitle?: string;
  views?: number;
  description: string;
  price: number;
  finalPrice: number;
  access: AccessStatus;
  level: CourseLevel;
  thumbnail: string;
  courseSlug: string;
  categoryId: {
    _id: string;
    name: string;
  }; // id of Lập trình/Khoa học máy tính
  userId: {
    _id: string;
    name: string;
    avatar: string;
  }; // FK
  requirements?: string[];
  willLearns?: string[];
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// When is use is enrolled ? (bought the course, click enroll if course is free)
