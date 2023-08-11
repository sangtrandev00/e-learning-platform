export interface ICertificate {
  _id: string;
  course: {
    _id: string;
    name: string;
  };
  user: {
    _id: string;
    name: string;
  };
  certificateName: string;
  createdAt: string;
}
