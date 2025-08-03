import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit{
  product!: Product;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    //get the "id" param string. convert string to a number using + symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    
    this.productService.getProduct(theProductId).subscribe(
      data => {this.product = data}
    );

  }
}
