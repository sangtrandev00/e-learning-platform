export interface ISection {
  _id: string;
  name: string;
  courseId: string;
}

export interface ILesson {
  _id: string;
  lessonName: string;
  chapterId: string;
  type: string; // Text, Coding exercise, video, slide, ...
  content: string; // link youtube, pdf, slide, coding title
  isViewed: boolean;
}
