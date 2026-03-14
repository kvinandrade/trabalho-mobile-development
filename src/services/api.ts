import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10_000,
});

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  images: string[];
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export async function getProductsByCategory(category: string) {
  const { data } = await api.get<ProductsResponse>(`/products/category/${category}`);
  return data;
}

export async function getProductById(id: string | number) {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}

export default api;
