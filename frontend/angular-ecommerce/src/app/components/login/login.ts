import { OktaAuthConstructor } from './../../../../node_modules/@okta/okta-auth-js/types/lib/base/types.d';
import { Component, Inject, OnInit } from '@angular/core';
import { MyAppConfig } from '../../config/my-app-config';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit{
  constructor(public auth: AuthService) {}
  
  ngOnInit(): void {
  }

}
