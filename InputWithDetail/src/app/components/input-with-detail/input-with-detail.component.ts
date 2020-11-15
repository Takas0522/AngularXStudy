import { AfterViewInit, Component, ComponentFactoryResolver, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DetailDirective } from './detail.directive';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'app-input-with-detail',
  templateUrl: './input-with-detail.component.html',
  styleUrls: ['./input-with-detail.component.scss']
})
export class InputWithDetailComponent implements OnInit, OnDestroy {

  isDetailOpen = false;
  @ViewChild(DetailDirective, { static: true }) detail!: DetailDirective;
  inputText = new FormControl('');

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.loadComponent();
    this.controlSettingInit();
  }

  private loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DetailComponent);
    const viewConrainer = this.detail.viewContainerRef;
    viewConrainer.clear();
    const compoentRef = viewConrainer.createComponent(componentFactory);
  }

  private controlSettingInit(): void {

  }

  ngOnDestroy(): void {
  }

}
