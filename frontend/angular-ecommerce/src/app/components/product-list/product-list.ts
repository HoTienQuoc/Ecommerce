import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list-grid.html',
  styleUrl: './product-list.scss'
})
export class ProductList implements OnInit{  
  products: Product[] = [];

  constructor(private productService: ProductService){

  }
  ngOnInit(): void {//similar to @PostConstruct
    this.listProducts();
  }
  listProducts() {
    this.productService.getProductList().subscribe(
      data => {// assign results to the product array
        this.products = data;
      }
    );
    //subscribe:  "Phương thức đó sẽ chỉ được thực thi khi bạn thực hiện việc subscribe() vào observable."

  }

}
