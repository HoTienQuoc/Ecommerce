import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit{

  product!: Product;
  constructor(
    private productService: ProductService,
    private cartService:CartService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    //get the "id" param string. convert string to a number using + symbol

    // Chi tiết:
    //   this.route.snapshot.paramMap.get('id')!: Lấy id từ URL (ví dụ: /products/3 → id = 3).
    //   +: Ép kiểu từ string sang number.
    //   Gọi productService.getProduct(theProductId) để fetch dữ liệu sản phẩm.
    //   Gán kết quả trả về (data) vào biến this.product.
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    
    this.productService.getProduct(theProductId).subscribe(
      data => {this.product = data}
    );

  }

  addToCart() {
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }
}
