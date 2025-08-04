import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  
  private baseUrl = "http://localhost:8080/api/products";

  private categoryUrl = "http://localhost:8080/api/product-category";

  constructor(private httpClient: HttpClient){}

  /* 
    return an observable map the json data from spring data Rest to Product array
    Observables trong RxJS là "lazy" (lười biếng) — chúng không làm gì cả cho đến khi có người subscribe.
  */

  getProduct(theProductId: number):Observable<Product> {
    //need to build url based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
    
  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ):Observable<GetResponseProducts>{
    //@TODO: need to build URL based on category id, page, size

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
      + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(theCategoryId: number):Observable<Product[]>{
    //@TODO: need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyWord: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`;
    return this.getProducts(searchUrl);  
  }

  searchProductsListPaginate(
    thePage: number,
    thePageSize: number,
    theKeyWord: string
  ):Observable<GetResponseProducts>{
    //@TODO: need to build URL based on keyword, page, size

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`
      + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]>{
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategories)
    );
  }

  

  
}

interface GetResponseProducts{
  _embedded: {
    products: Product[];
  },
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number: number,
  }
}

interface GetResponseCategories{
  _embedded: {
    productCategories: ProductCategory[];
  }
}


