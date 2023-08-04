import { IOrder } from './order.type';

export interface IReport {
  categories: number;
  courses: number;
  users: number;
  orders: IOrder[];
  saleOf30days: number;
  avgTimeLearningPerUser: number;
  conversions: number;
}
