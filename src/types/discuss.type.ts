export interface IDiscuss {
  _id: string;
  lessonId: string;
  authorId: string;
  content: string;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
  replies: {
    userId: string; // Other user Id
    name: string;
    avatar: string;
    contentReply: string;
    isLiked: boolean; // true or false
    createdAt: string;
    updatedAt: string;
  }[];
}
