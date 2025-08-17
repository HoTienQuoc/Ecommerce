import { Router, Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { ProductDetails } from './components/product-details/product-details';
import { CartDetails } from './components/cart-details/cart-details';
import { Checkout } from './components/checkout/checkout';
import { LoginStatus } from './components/login-status/login-status';
import { MembersPage } from './components/members-page/members-page';
import { AuthGuard } from '@auth0/auth0-angular';
import { Injector } from '@angular/core';

function sendToLoginPage(injector: Injector){
    const router = injector.get(Router);
    router.navigate(["/login"]);
}
export const routes: Routes = [
    {path: 'members', component: MembersPage, canActivate: [AuthGuard], data: {onAuthRequired: sendToLoginPage}},
    {path: 'login', component: LoginStatus},
    {path: 'checkout', component: Checkout},
    {path: 'search/:keyword', component: ProductList},
    {path: 'products/:id', component: ProductDetails},
    {path: 'cart-details', component: CartDetails},
    {path: 'category/:id', component: ProductList},
    {path: 'category', component: ProductList},
    {path: 'products', component: ProductList},
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '**', redirectTo: '/', pathMatch: 'full'},
];
