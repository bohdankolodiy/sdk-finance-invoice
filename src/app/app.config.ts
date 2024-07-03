import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ErrorCatchingInterceptor } from './interceptors/error-catching.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([ErrorCatchingInterceptor])
    ),
    provideAnimationsAsync(),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
      progressBar: true,
      newestOnTop: true,
      closeButton: true,
    }),
  ],
};
