import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputWithDetailComponent } from './components/input-with-detail/input-with-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailComponent } from './components/input-with-detail/detail/detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailIconStatePipe } from './components/input-with-detail/detail-icon-state.pipe';
import { DetailDirective } from './components/input-with-detail/detail.directive';

@NgModule({
  declarations: [
    AppComponent,
    InputWithDetailComponent,
    DetailComponent,
    DetailIconStatePipe,
    DetailDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
