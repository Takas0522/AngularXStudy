import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { DetailDirective } from './detail.directive';
import { DetailComponent } from './detail/detail.component';
import { DetailComponentInterface } from './models/detail-component.interface';
import { InputWithDetailValueInterface } from './models/input-with-detail-value.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-input-with-detail',
  templateUrl: './input-with-detail.component.html',
  styleUrls: ['./input-with-detail.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputWithDetailComponent,
      multi: true
    }
  ]
})
export class InputWithDetailComponent<C extends DetailComponentInterface, D> implements OnInit, OnDestroy, ControlValueAccessor {

  isDetailOpen = false;
  @ViewChild(DetailDirective, { static: true }) detail!: DetailDirective;

  @Input() component: Type<C>;

  inputText = new FormControl('');
  private compoentRef: ComponentRef<DetailComponentInterface>;
  private controlValueChange!: BehaviorSubject<InputWithDetailValueInterface<D>>;
  private detailData: InputWithDetailValueInterface<D>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.loadComponent();
    this.controlSettingInit();
  }

  private loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
    const viewConrainer = this.detail.viewContainerRef;
    viewConrainer.clear();
    this.compoentRef = viewConrainer.createComponent<DetailComponentInterface>(componentFactory);
  }

  private controlSettingInit(): void {
    this.inputText.valueChanges.subscribe(text => {
      const d = this.controlValueChange.value;
      d.inputText = text;
      this.controlValueChange.next(d);
    });
    this.compoentRef.instance.detailSubmit$.subscribe(x => {
      const d = this.controlValueChange.value;
      d.detail = x;
      this.detailData = x;
      this.controlValueChange.next(d);
      this.isDetailOpen = false;
    });
    this.valueInit();
  }

  private valueInit(): void {
    const text = this.inputText.value;
    const val = this.compoentRef.instance.formGroup.value;
    this.detailData = val;
    this.controlValueChange = new BehaviorSubject({ inputText: text, detail: val });
  }

  detailToggel(): void {
    if (!this.isDetailOpen) {
      this.compoentRef.instance.formGroup.patchValue(this.detailData);
    }
    this.isDetailOpen = !this.isDetailOpen;
  }

  writeValue(obj: InputWithDetailValueInterface<D>): void {
    if (obj) {
      this.inputText.patchValue(obj.inputText);
      this.compoentRef.instance.formGroup.patchValue(obj.detail);
      this.valueInit();
    }
  }
  registerOnChange(fn: any): void {
    this.controlValueChange.subscribe(fn);
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
  }

}
