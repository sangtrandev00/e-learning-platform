export interface IEnrollment {
  _id: string;
  usersEnrolled: {
    userId: string;
    lessonDone: number;
    dateStart: string;
  }[];
  coursesEnrolled: {
    courseId: string;
    lessonDone: number;
    dateStart: string;
  }[];
}
