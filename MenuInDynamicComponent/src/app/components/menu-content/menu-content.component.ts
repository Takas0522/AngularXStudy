import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, Type, ViewChild } from '@angular/core';
import { MenuContentDirective } from 'src/app/directves/menu-content.directive';

@Component({
  selector: 'app-menu-content',
  templateUrl: './menu-content.component.html',
  styleUrls: ['./menu-content.component.scss']
})
export class MenuContentComponent<ComponentType> implements OnInit {

  @Input() contentComponent!: Type<ComponentType>;
  @ViewChild(MenuContentDirective, { static: true }) menuContent!: MenuContentDirective;
  private compoentRef!: ComponentRef<ComponentType>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.loadContentComponent();
  }

  private loadContentComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.contentComponent);
    const viewConrainer = this.menuContent.viewContainerRef;
    viewConrainer.clear();
    this.compoentRef = viewConrainer.createComponent<ComponentType>(componentFactory);
  }

}
