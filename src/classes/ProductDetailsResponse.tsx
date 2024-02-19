export interface ProductDetailsResponse {
  error: boolean;
  message: string;
  data: product_details;
}

export interface product_details {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  url: string;
}
