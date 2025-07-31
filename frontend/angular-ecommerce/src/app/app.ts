import { Component } from '@angular/core';
import { ProductList } from "./components/product-list/product-list";
import { Product } from './services/product.service';

@Component({
  selector: 'app-root',
  imports: [ProductList],
  providers:[Product],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-ecommerce';
}
