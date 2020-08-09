import { Configuration } from '@azure/msal-browser';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const authSetting: Configuration = {
  auth: {
    clientId: 'fc1b6a20-7f6d-4621-80e4-dcee5ec07aca',
    authority: 'https://login.microsoftonline.com/028db01b-7420-42ce-ba2e-6efb6ac11c10/',
    redirectUri: 'http://localhost:4200'
  }
};

export const environment = {
  production: false,
  msalSettings: authSetting,
  scopes: ['user.read']
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
