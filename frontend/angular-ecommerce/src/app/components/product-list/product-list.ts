import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list-grid.html',
  styleUrl: './product-list.scss'
})
export class ProductList implements OnInit{  
  products: Product[] = [];

  currentCategoryId: number = 1;

  searchMode: boolean = false;


  //route: ActivatedRoute: là một service cung cấp thông tin về route hiện tại.
  //Để lấy thông tin từ route, chúng ta cần inject ActivatedRoute vào constructor của component.
  constructor(private productService: ProductService, private route: ActivatedRoute){

  }
  ngOnInit(): void {//similar to @PostConstruct
    this.route.paramMap.subscribe(
      data => {
        this.listProducts();
      }
    );
    this.listProducts();
  }
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has("keyword");
    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
  }

  handleSearchProducts(){
    const theKeyWord: string = this.route.snapshot.paramMap.get('keyword')!;

    //now search for products using keyword
    this.productService.searchProducts(theKeyWord).subscribe(
      data => {
        this.products = data;
      }
    );

  }

  handleListProducts(){
    //check if id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');//use snapshot to get the current route snapshot
    if(hasCategoryId){
      //get the "id" parameter string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      //if no category id available, then default to category id 1
      this.currentCategoryId = 1;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {// assign results to the product array
        this.products = data;
      }
    );
    //subscribe:  "Phương thức đó sẽ chỉ được thực thi khi bạn thực hiện việc subscribe() vào observable."

  }


}
