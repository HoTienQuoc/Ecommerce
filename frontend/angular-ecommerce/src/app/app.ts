import { Component } from '@angular/core';
import { ProductList } from "./components/product-list/product-list";
import { ProductService } from './services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ProductList,RouterModule],
  providers:[ProductService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-ecommerce';
}
