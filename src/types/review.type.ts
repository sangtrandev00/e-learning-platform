export interface IReview {
  authorId: string;
  title: string;
  createdAt: string;
  content: string;
  courseId: string;
  orderId: string;
  replies: IReplyReview[];
}

export interface IReplyReview {
  userId: string;
  name: string;
}
