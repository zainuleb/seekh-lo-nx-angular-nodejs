import { Category } from './category';

export class Course {
  title?: string;
  description?: string;
  richDescription?: string;
  image?: string | ArrayBuffer | null;
  images?: string[];
  category?: Category;
  price?: string;
  language?: string;
  rating?: number;
  isFeatured?: boolean;
}
