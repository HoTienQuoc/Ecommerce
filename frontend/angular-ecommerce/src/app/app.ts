import { Component } from '@angular/core';
import { ProductService } from './services/product.service';
import { RouterModule } from '@angular/router';
import { ProductCategoryMenu } from "./components/product-category-menu/product-category-menu";
import { Search } from "./components/search/search";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatus } from "./components/cart-status/cart-status";

@Component({
  selector: 'app-root',
  imports: [RouterModule, ProductCategoryMenu, Search, NgbModule, CartStatus],
  providers:[ProductService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-ecommerce';
}
