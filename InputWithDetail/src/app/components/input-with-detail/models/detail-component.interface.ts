import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface DetailComponentInterface {
    formGroup: FormGroup;
    detailSubmit$;
    onSubmit(): void;
}
