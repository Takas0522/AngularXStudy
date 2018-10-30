import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlankComponent } from './blank/blank.component';
import { QrCodeScannerComponent } from './qr-code-scanner/qr-code-scanner.component';
import { QrCodeGeneratorComponent } from './qr-code-generator/qr-code-generator.component';

const routes: Routes = [
  { path: 'blank', component: BlankComponent },
  { path: 'scanner', component: QrCodeScannerComponent },
  { path: 'generator', component: QrCodeGeneratorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
