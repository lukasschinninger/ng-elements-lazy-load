import {Inject, Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LazyElementsProxyComponent} from './lazy-elements-proxy.component';
import {createCustomElement} from '@angular/elements';
import {ElementRegistryFactory} from './interfaces/elements-registry.interface';
import {ELEMENT_MODULE_RESOLVER} from './tokens/element-module-resolver.token';
import {ELEMENT_REGISTRY_FACTORY} from './tokens/element-regitstry-factory.token';
import {ELEMENT_NAME} from './tokens/element-name.token';
import {LazyElementsLoader} from './lazy-elements-loader.service';


@NgModule({
  declarations: [LazyElementsProxyComponent],
  exports: [],
  imports: [
    CommonModule,
  ],
  entryComponents: [LazyElementsProxyComponent]
})
export class LazyElementsProxyModule {

  static forRoot(elementRegistryFactory: ElementRegistryFactory): ModuleWithProviders {
    return {
      ngModule: LazyElementsProxyModule,
      providers: [
        {
          provide: ELEMENT_REGISTRY_FACTORY,
          useValue: elementRegistryFactory
        },
        LazyElementsLoader
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
            },
            {
              provide: ELEMENT_NAME,
              useValue: elementName
            }
          ]
        }
      );

      const el = createCustomElement(LazyElementsProxyComponent, {injector: elementsInjector});
      customElements.define(elementName, el);
    }
  }

}
