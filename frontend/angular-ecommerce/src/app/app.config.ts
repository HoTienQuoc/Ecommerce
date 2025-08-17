import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAuth0({
      domain: 'dev-yq1ooyj5xown8zaa.us.auth0.com',
      clientId: '6f85Y8RbebWvb6evQeyBYSKRx7r8dN90',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes)
  ]
};
