export interface IOrder {
  _id: string;
  orderItems: IOrderItem[];
  transaction: ITransaction;
  user: {
    userId: string;
    name: string;
    phone: string;
    email: string;
  };
  status: string;
}

interface ITransaction {
  transactionId: string;
  status: string;
  paidAt: string;
  isPaid: boolean;
  paymentMethod: string; // STRIPE, PAYPAL, VNPAY, MOMO
}

interface IOrderItem {
  _id: string;
  courseId: string;
  courseName: string;
  coursePrice: number;
  thumbnail: string;
}
