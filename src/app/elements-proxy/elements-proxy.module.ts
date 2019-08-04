import {Inject, Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ElementsProxyComponent} from './elements-proxy.component';
import {ElementRegistry, ElementRegistryFactory} from './elements-registry.interface';
import {createCustomElement} from '@angular/elements';
import {ELEMENT_MODULE_RESOLVER} from './element-module-resolver.token';
import {ELEMENT_REGISTRY_FACTORY} from './element-regitstry-factory.token';


@NgModule({
  declarations: [ElementsProxyComponent],
  exports: [],
  imports: [
    CommonModule,
  ],
  entryComponents: [ElementsProxyComponent]
})
export class ElementsProxyModule {

  static forRoot(elementRegistryFactory: ElementRegistryFactory): ModuleWithProviders {
    return {
      ngModule: ElementsProxyModule,
      providers: [
        {
          provide: ELEMENT_REGISTRY_FACTORY,
          useValue: elementRegistryFactory
        }
      ],
    };
  }


  public constructor(@Inject(ELEMENT_REGISTRY_FACTORY) private elementRegistryFactory: ElementRegistryFactory, private injector: Injector) {

    const elementRegistry = elementRegistryFactory();
    for (const elementName of Object.keys(elementRegistry)) {

      const elementsInjector = Injector.create(
        {
          parent: this.injector,
          providers: [
            {
              provide: ELEMENT_MODULE_RESOLVER,
              useValue: elementRegistry[elementName]
            }
          ]
        }
      );

      const el = createCustomElement(ElementsProxyComponent, {injector: elementsInjector});
      customElements.define(elementName, el);
    }
  }

}
