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
import { NotifierModule } from 'angular-notifier';
import { customNotifierOptions } from './shared/utils/notifier';
import { ErrorCatchingInterceptor } from './interceptors/error-catching.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([ErrorCatchingInterceptor])
    ),
    provideAnimationsAsync(),
    importProvidersFrom(NotifierModule.withConfig(customNotifierOptions)),
  ],
};
