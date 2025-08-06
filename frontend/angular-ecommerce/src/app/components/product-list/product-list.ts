import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule, NgbPaginationModule],
  templateUrl: './product-list-grid.html',
  styleUrl: './product-list.scss'
})
export class ProductList implements OnInit{


  products: Product[] = [];

  currentCategoryId: number = 1;
  previousCategoryId: number = 1;


  searchMode: boolean = false;

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = "";


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

    //if we have a different keyword than previous
    //then set thePageNumber to 1

    if(this.previousKeyword != theKeyWord){
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyWord;

    //now search for products using keyword
    this.productService
    .searchProductsListPaginate(this.thePageNumber-1, this.thePageSize, theKeyWord)
    .subscribe(this.proccessResult());

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

    //check if we have a different category than previous
    //Note: angular will reuse a component if it is currently being view 

    //if we have a different category id than previous
    //then set thePageNumber back to 1

    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber=1;
    }

    this.previousCategoryId = this.currentCategoryId;



    this.productService.getProductListPaginate(
      this.thePageNumber-1,this.thePageSize,this.currentCategoryId
    ).subscribe(
      data=>{
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number+1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      }
    );
    //subscribe:  "Phương thức đó sẽ chỉ được thực thi khi bạn thực hiện việc subscribe() vào observable."

  }

  updatePageSize(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
  
    this.thePageSize = parseInt(selectElement.value, 10); // hoặc +selectElement.value
    this.thePageNumber = 1;
  
    this.listProducts(); // gọi lại API hoặc phương thức hiển thị danh sách sản phẩm
  }

  proccessResult(){
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number+1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  addToCart(_t5: Product) {
    throw new Error('Method not implemented.');
  }
  
}
