import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MsalModule, MsalService } from '@azure/msal-angular';
import { RouterModule, Route } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DummyRoutingAppComponent } from './dummy-routing-app/dummy-routing-app.component';

const router: Route[] = [
  { path: 'dummy-routing', component: DummyRoutingAppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DummyRoutingAppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router, { useHash: true }),
    MsalModule.forRoot(environment.msalConfig)
  ],
  providers: [
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
