export interface ProductsResponse {
  error: boolean;
  message: string;
  data: products_data;
}

export interface products_data {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  url: string;
}
