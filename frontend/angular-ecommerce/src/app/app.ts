import { Component } from '@angular/core';
import { ProductList } from "./components/product-list/product-list";
import { ProductService } from './services/product.service';
import { RouterModule } from '@angular/router';
import { ProductCategoryMenu } from "./components/product-category-menu/product-category-menu";
import { Search } from "./components/search/search";

@Component({
  selector: 'app-root',
  imports: [RouterModule, ProductList, ProductCategoryMenu, Search],
  providers:[ProductService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-ecommerce';
}
