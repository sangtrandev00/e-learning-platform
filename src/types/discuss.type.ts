export interface IDiscuss {
  // thread
  _id: string;
  lessonId: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  replies: IReply[];
}

export interface IReply {
  userId: string; // Other user Id
  name: string;
  avatar: string;
  contentReply: string;
  isLiked: boolean; // true or false
  createdAt: string;
  updatedAt: string;
}
