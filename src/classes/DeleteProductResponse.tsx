export interface DeleteProductResponse {
  error: boolean;
  message: string;
  data: delete_product_data[];
}

export interface delete_product_data {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  url: string;
}
