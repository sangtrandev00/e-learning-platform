// Những khóa học cụ thể hóa về lập trình (Javascript, HTML CSS,  )
// Danh mục (Lập trình, Ngôn ngữ, Kinh doanh,... )

export interface ICategory {
  _id: string;
  name: string;
  description: string;
  cateImage: string;
  cateSlug: string;
  parentId?: string; // 0, 1, 2
  createdAt?: string;
  courses?: number;
}
