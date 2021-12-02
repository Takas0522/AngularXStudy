import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AComponent } from './components/a/a.component';
import { BComponent } from './components/b/b.component';
import { BlankComponent } from './components/blank/blank.component';

@NgModule({
  declarations: [
    AppComponent,
    AComponent,
    BComponent,
    BlankComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
