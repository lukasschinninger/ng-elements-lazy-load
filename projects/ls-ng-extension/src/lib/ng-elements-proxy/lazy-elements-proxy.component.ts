import {
  Compiler,
  Component,
  ComponentFactoryResolver,
  ElementRef, EventEmitter,
  Inject,
  Injector,
  NgModuleFactory,
  NgModuleRef,
  OnInit,
  Type,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {ELEMENT_MODULE_RESOLVER} from './tokens/element-module-resolver.token';
import {ElementModuleResolver} from './interfaces/elements-registry.interface';
import {LazyElementModule} from './interfaces/lazy-element-module.interface';


@Component({
  selector: 'app-elements-proxy',
  template: `
      <div #host></div>`
})
export class LazyElementsProxyComponent implements OnInit {


  public attributes = {};


  @ViewChild('host', {read: ViewContainerRef, static: true})
  public hostRef: ViewContainerRef;

  constructor(
    @Inject(ELEMENT_MODULE_RESOLVER) private moduleResolver: ElementModuleResolver,
    private compiler: Compiler,
    private injector: Injector,
    private elementRef: ElementRef) {

  }

  private dashToCamelCase(value: string) {
    return value.replace(/-([a-z])/g, ((g) => {
          return g[1].toUpperCase();
        }
      )
    );
  }

  ngOnInit() {
    (<Promise<Type<any>>> this.moduleResolver())
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
        this.hostRef.clear();
        const componentRef = this.hostRef.createComponent(componentFactory);


        // input binding
        this.assignAttributes(componentRef.instance);
        const observer = new MutationObserver(mutations => {
          this.assignAttributes(componentRef.instance);
        });
        observer.observe(this.elementRef.nativeElement, {attributes: true});

        // output binding
        for (const key of Object.keys(componentRef.instance)) {
          if (componentRef.instance[key] instanceof EventEmitter) {

            const eventEmitter = <EventEmitter<any>> componentRef.instance[key];
            eventEmitter.subscribe(v => {
              const event = new Event(key, v);
              this.elementRef.nativeElement.dispatchEvent(event);
            });
          }
        }

        console.log(Object.keys(componentRef.instance));
        console.log(componentRef.instance);

      });
  }

  private assignAttributes(elementInstance: any) {

    const attributes = {};
    for (const attribute of this.elementRef.nativeElement.attributes) {
      this.attributes[this.dashToCamelCase(attribute.name)] = attribute.value;
    }
    Object.assign(elementInstance, this.attributes);
  }

}
