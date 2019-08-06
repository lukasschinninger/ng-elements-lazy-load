import {ElementModuleResolver} from './interfaces/elements-registry.interface';
import {
  Compiler,
  ComponentFactory,
  ComponentFactoryResolver,
  EventEmitter,
  Injectable,
  Injector,
  NgModuleFactory,
  Type
} from '@angular/core';
import {LazyElementModule} from './interfaces/lazy-element-module.interface';

@Injectable()
export class LazyElementsLoader {


  private loadingNameToComponentFactory: { [name: string]: Promise<ComponentFactory<any>> } = {};
  private loadedNameToComponentFactory: { [name: string]: ComponentFactory<any> } = {};

  public constructor(private injector: Injector, private compiler: Compiler) {

  }


  public async loadComponentFactory(elementName: string, moduleResolver: ElementModuleResolver): Promise<ComponentFactory<any>> {

    // already loaded
    if (this.loadedNameToComponentFactory[elementName]) {
      return this.loadedNameToComponentFactory[elementName];
    }

    // current loading
    if (this.loadingNameToComponentFactory[elementName]) {
      return this.loadingNameToComponentFactory[elementName];
    }

    const promise = new Promise<ComponentFactory<any>>(resolve =>
      (<Promise<Type<any>>> moduleResolver())
        .then(moduleOrFactory => {
          if (moduleOrFactory instanceof NgModuleFactory) {
            return moduleOrFactory;
          } else {
            return this.compiler.compileModuleAsync(moduleOrFactory);
          }
        })
        .then(factory => {
          const moduleRef = factory.create(this.injector);
          const moduleInstance = moduleRef.instance as LazyElementModule;
          const componentFactoryResolver = moduleRef.injector.get(ComponentFactoryResolver);
          const componentFactory = componentFactoryResolver.resolveComponentFactory(moduleInstance.elementComponent);
          console.log(componentFactory);
          resolve(componentFactory);
        })
    );

    promise.then(v => {
      delete (this.loadingNameToComponentFactory[elementName]);
      this.loadedNameToComponentFactory[elementName] = v;
    });
    this.loadingNameToComponentFactory[elementName] = promise;

    return promise;
  }


}
