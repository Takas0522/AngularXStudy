import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MsalModule, MsalService } from '@azure/msal-angular';
import { RouterModule, Route } from '@angular/router';
import { environment } from 'src/environments/environment';

const router: Route[] = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MsalModule.forRoot(environment.msalConfig),
    RouterModule.forRoot(router)
  ],
  providers: [
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
