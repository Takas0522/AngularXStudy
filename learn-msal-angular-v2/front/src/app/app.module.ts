import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalBroadcastService, MsalInterceptor, MsalInterceptorConfiguration, MsalService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';

const msalInstanceFactory = (): IPublicClientApplication => {
  return new PublicClientApplication(environment.msalConfig);
}

const mealInterceptorConfigFactory = (): MsalInterceptorConfiguration => {
  const protectedResourceMap = new Map<string, Array<string>>();
  const conf = environment.msalInterceptorConfig;
  conf.forEach(f => {
    protectedResourceMap.set(f.resource, f.scopes);
  });
  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: msalInstanceFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: mealInterceptorConfigFactory
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalService,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
