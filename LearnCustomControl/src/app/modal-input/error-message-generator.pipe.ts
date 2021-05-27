import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'errorMessageGenerator'
})
export class ErrorMessageGeneratorPipe implements PipeTransform {

  transform(error: any, collection: { sig: string, errors: { sig: string, message: string }[] }[], control: string): string {
    if (error == null) {
      return '';
    }
    const controlError = collection.find(f => f.sig == control);
    let errMessage = '';
    if (!controlError) {
      return '';
    }
    const hasControlError = error.hasOwnProperty(control)
    if (!hasControlError) {
      return '';
    }
    controlError.errors.forEach(f => {
      if (hasControlError) {
        const controlError = error[control];
        if (controlError.error === f.sig) {
          errMessage = f.message;
        }
      }
    });
    return errMessage;
  }

}
