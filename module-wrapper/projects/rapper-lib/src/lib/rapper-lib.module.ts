import { NgModule, ModuleWithProviders } from '@angular/core';
import { MsalModule, MSAL_CONFIG, MSAL_CONFIG_ANGULAR, MsalAngularConfiguration } from '@azure/msal-angular';
import { defaultMsalAngularConfiguration } from '@azure/msal-angular/src/msal-angular.configuration';
import { Configuration } from 'msal';
import { MsalConfigService } from './services/msal-config.service';

@NgModule({
  declarations: [],
  imports: [
  ],
  exports: []
})
export class RapperLibModule {
  static forRoot(
    config: Configuration,
    angularConfig: MsalAngularConfiguration = defaultMsalAngularConfiguration
  ): ModuleWithProviders {
   return {
     ngModule: MsalModule,
     providers: [
       {
           provide: MSAL_CONFIG,
           useValue: config
       },
       {
           provide: MSAL_CONFIG_ANGULAR,
           useValue: angularConfig
       },
       MsalConfigService
     ]
   };
 }
}
