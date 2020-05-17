import { NgModule, ModuleWithProviders } from '@angular/core';
import { CustomControlComponent } from './components/custom-control/custom-control.component';
import { CustomLibConfig } from './custom-lib.config';



@NgModule({
  declarations: [
    CustomControlComponent
  ],
  imports: [
  ],
  exports: [
    CustomControlComponent
  ]
})
export class CustomLib2Module {
  static forRoot(config: CustomLibConfig): ModuleWithProviders {
    return {
      ngModule: CustomLib2Module,
      providers: [
        { provide: CustomLibConfig, useValue: config }
      ]
    };
  }
}
