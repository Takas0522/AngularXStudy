import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
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
export class CustomLib1Module {
  static forRoot(config: CustomLibConfig): ModuleWithProviders {
    return {
      ngModule: CustomLib1Module,
      providers: [
        { provide: CustomLibConfig, useValue: config }
      ]
    };
  }
}
