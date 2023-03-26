import { Component, EventEmitter, inject, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { ErrorsInfoService } from 'src/app/services/errors-info.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-my-custom-control',
  templateUrl: './my-custom-control.component.html',
  styleUrls: ['./my-custom-control.component.scss']
})
export class MyCustomControlComponent implements OnInit,  ControlValueAccessor {

  /**
   * @ignore
   */
  protected inputForm = new FormControl('');

  /**
   * コントロールのラベル部分の指定を行うことが可能です
   */
  @Input()
  label = '';

  /**
   * @ignore
   */
  protected outputLabel = '';

  @Output()
  ready = new EventEmitter<void>();

  private supplierService = inject(SupplierService);

  constructor(
    @Self()
    @Optional()
    private ngControl: NgControl,
    private errorsInfoService: ErrorsInfoService
  ) {
    this.controlInit();
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.controlActionInit();
    this.dataInit();
  }

  private async dataInit() {
    await this.supplierService.init()
    this.ready.emit();
  }

  /**
   * @ignore
   * @returns
   */
  private controlInit() {
    if (this.ngControl == null) {
      return;
    }
    this.ngControl.valueAccessor = this;
  }

  /**
   * @ignore
   */
  private controlActionInit() {
    this.inputForm.valueChanges.subscribe(x => {
      // データ変わるたびにWebAPI投げてたら動作に影響出そうなので変更後X秒待機とか入れたほうが良さげか
      if (x) {
        this.getData(x);
      }
      this.onChange(x);
      this.onTouched();
      this.setErrors();
    });
  }

  private getData(x: string) {
    this.supplierService.getData(x).subscribe(x => {
      if (x != null) {
        this.outputLabel = x.supplierName;
      }
    });
  }

  /**
   * @ignore
   * @returns
   */
  private setErrors(): void {
    if (this.ngControl && this.ngControl.errors) {
      this.inputForm.setErrors(this.ngControl.errors);
      return;
    }
    this.inputForm.setErrors(null);
  }

  /**
   * @ignore
   * @param obj
   */
  writeValue(obj: any): void {
    this.inputForm.patchValue(obj);
  }

  /**
   * @ignore
   * @param obj
   * @returns
   */
  private onChange = (obj: string | null) => undefined;
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * @ignore
   * @returns
   */
  private onTouched = () => undefined;
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * @ignore
   * @param isDisabled
   */
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputForm.disable();
    } else {
      this.inputForm.enable();
    }
  }

  /**
   * @ignore
   */
  protected get errorMessage(): string {
    if (this.inputForm.errors) {
      for(var prop in this.inputForm.errors) {
        return this.errorsInfoService.getErrorMessage(prop);
      }
    }
    return '';
  }
}
