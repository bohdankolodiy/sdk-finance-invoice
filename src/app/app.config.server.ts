import {
  mergeApplicationConfig,
  ApplicationConfig,
  TransferState,
  makeStateKey,
  APP_INITIALIZER,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

export const envStateKey = makeStateKey<{ API_URL: string }>('env');

export function transferStateFactory(transferState: TransferState) {
  return () => {
    const envVars = {
      API_URL: 'https://apimtt.binariks.net',
      // Add more environment variables as needed
    };
    transferState.set<any>(envStateKey, envVars);
  };
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: APP_INITIALIZER,
      useFactory: transferStateFactory,
      deps: [TransferState],
      multi: true,
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
