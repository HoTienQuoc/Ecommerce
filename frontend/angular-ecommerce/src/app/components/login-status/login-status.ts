import { CommonModule } from '@angular/common';
import { Component, DOCUMENT, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-login-status',
  imports: [CommonModule],
  templateUrl: './login-status.html',
  styleUrl: './login-status.scss'
})
export class LoginStatus {
  storage: Storage = sessionStorage;

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}


}
