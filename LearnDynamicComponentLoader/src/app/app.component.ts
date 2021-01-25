import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ComponentOneComponent } from './components/component-one/component-one.component';
import { DynamicComponentDirective } from './dynamic-component.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(DynamicComponentDirective, { static: true }) private dcDirective!: DynamicComponentDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  private loadComponent(): void {
    const cf = this.componentFactoryResolver.resolveComponentFactory(ComponentOneComponent);
    const containerRef = this.dcDirective.viewContainerRef;
    const componentRef = containerRef.createComponent<ComponentOneComponent>(cf);
    componentRef.instance.data.subscribe(x => console.log(x));
  }
}
