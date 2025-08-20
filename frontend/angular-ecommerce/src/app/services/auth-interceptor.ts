import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }
  
  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>>{
    // Only add an access token for secured endpoints
    const securedEndpoints = ['http://localhost: 8080/api/orders'];
    if (securedEndpoints.some(url => request.urlWithParams. includes (url) )){
      // get access token
      // clone the request and add new header with access token
    }
    return null;
  }
  
}
