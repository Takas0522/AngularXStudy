import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CustomLib1Module } from 'custom-lib1';
// import { CustomLib1Module } from 'projects/custom-lib1/src/lib/custom-lib1.module';
import { CustomLib2Module } from 'custom-lib2';
// import { CustomLib2Module } from 'projects/custom-lib2/src/lib/custom-lib2.module';
import { AppComponent } from './app.component';
import { SharedCustomLibService } from 'shared-custom-lib';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CustomLib1Module.forRoot({ applicationId: 'Lib1ModuleApplicationid', endPointUrl: 'Lib1EndPointUrl' }),
    CustomLib2Module.forRoot({ applicationId: 'Lib2ModuleApplicationid', endPointUrl: 'Lib2EndPointUrl' }),
  ],
  providers: [
    { provide: 'SHARED_SERVICE', useClass: SharedCustomLibService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
