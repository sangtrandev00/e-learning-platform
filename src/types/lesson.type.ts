export interface ISection {
  _id: string;
  name: string;
  courseId: string;
  description: string;
  access: string;
}

export interface ILesson {
  _id: string;
  name: string;
  sectionId: string;
  type: string; // Text, Coding exercise, video, slide, ...
  content: string; // link youtube, pdf, slide, coding title
  access: string;
  description: string;
}
