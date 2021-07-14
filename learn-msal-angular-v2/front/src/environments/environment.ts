// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { LogLevel } from "@azure/msal-browser";

const loggerCallback = (logLevel: LogLevel, message: string) => {
  console.log({ logLevel, message });
}

export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: '3d5b10ad-0205-40af-a5aa-b955ceaa297b',
      authority: 'https://takassampleb2c.b2clogin.com/takassampleb2c.onmicrosoft.com/B2C_1_SUSI',
      redirectUri: 'http://localhost:4200',
      knownAuthorities: [
        'takassampleb2c.b2clogin.com'
      ]
    }
  },
  msalInterceptorConfig: [
    { resource: '/base-api/', scopes: ['https://takassampleb2c.onmicrosoft.com/ab363e32-fc0e-4997-9db5-70aafde9a070/access'] }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
