import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [ provideAnimations(), // required animations providers
    provideToastr(), // T
    provideRouter(routes), provideClientHydration(),ToastrModule,importProvidersFrom(RouterModule,BrowserAnimationsModule),provideHttpClient(withFetch())]
};
