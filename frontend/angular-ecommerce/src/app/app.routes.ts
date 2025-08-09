import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { ProductDetails } from './components/product-details/product-details';
import { CartDetails } from './components/cart-details/cart-details';

export const routes: Routes = [
    {path: 'search/:keyword', component: ProductList},
    {path: 'products/:id', component: ProductDetails},
    {path: 'cart-details', component: CartDetails},
    {path: 'category/:id', component: ProductList},
    {path: 'category', component: ProductList},
    {path: 'products', component: ProductList},
    {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: '**', redirectTo: '/products', pathMatch: 'full'},
];
