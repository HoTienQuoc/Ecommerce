import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = "http://localhost:8080/api/products";
  constructor(private httpClient: HttpClient){}

  /* 
    return an observable map the json data from spring data Rest to Product array
    Observables trong RxJS là "lazy" (lười biếng) — chúng không làm gì cả cho đến khi có người subscribe.
  */

  getProductList():Observable<Product[]>{
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponse{
  _embedded: {
    products: Product[];
  }
}
