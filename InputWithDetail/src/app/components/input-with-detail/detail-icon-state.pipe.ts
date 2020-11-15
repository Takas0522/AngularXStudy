import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'detailIconState'
})
export class DetailIconStatePipe implements PipeTransform {

  transform(isDetailOpen: boolean): string {
    return isDetailOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

}
