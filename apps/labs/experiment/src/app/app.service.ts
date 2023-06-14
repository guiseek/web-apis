import { register } from '@web-apis/util-di';

export interface DataResponse {
  total: number;
  skip: number;
  limit: number;
}

export interface ProductResponse {
  products: Product[];
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export class AppService {
  url = `https://dummyjson.com`;

  async get<T>(
    endpoint: string,
    skip = 0,
    limit = 30
  ): Promise<DataResponse & T> {
    const path = `${this.url}/${endpoint}`;
    const params = this.#getParams({ skip, limit });
    const request = fetch(`${path}?${params.toString()}`);
    return request.then((res) => res.json());
  }

  #getParams(params: object) {
    return new URLSearchParams(JSON.stringify({ ...params }));
  }
}

register({
  for: AppService,
});
