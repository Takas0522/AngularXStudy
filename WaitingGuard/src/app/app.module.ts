import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitPageComponent } from './components/init-page/init-page.component';
import { GuardPageComponent } from './components/guard-page/guard-page.component';
import { NonGuardPageComponent } from './components/non-guard-page/non-guard-page.component';
import { BackendMockService } from './mock/backend-mock.service';

@NgModule({
  declarations: [
    AppComponent,
    InitPageComponent,
    GuardPageComponent,
    NonGuardPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BackendMockService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
