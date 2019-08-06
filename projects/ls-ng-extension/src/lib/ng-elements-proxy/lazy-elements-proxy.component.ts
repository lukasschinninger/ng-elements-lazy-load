import {
  Compiler,
  Component,
  ComponentFactoryResolver,
  ElementRef, EventEmitter,
  Inject,
  Injector,
  NgModuleFactory,
  OnInit,
  Type,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {ELEMENT_MODULE_RESOLVER} from './tokens/element-module-resolver.token';
import {ElementModuleResolver} from './interfaces/elements-registry.interface';
import {ELEMENT_NAME} from './tokens/element-name.token';
import {LazyElementsLoader} from './lazy-elements-loader.service';


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
    @Inject(ELEMENT_NAME) private elementName: string,
    private compiler: Compiler,
    private injector: Injector,
    private elementRef: ElementRef,
    private lazyElementsLoader: LazyElementsLoader) {

  }

  private dashToCamelCase(value: string) {
    return value.replace(/-([a-z])/g, ((g) => {
          return g[1].toUpperCase();
        }
      )
    );
  }

  async ngOnInit() {

    const componentFactory = await this.lazyElementsLoader.loadComponentFactory(this.elementName, this.moduleResolver);

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
  }

  private assignAttributes(elementInstance: any) {
    for (const attribute of this.elementRef.nativeElement.attributes) {
      this.attributes[this.dashToCamelCase(attribute.name)] = attribute.value;
    }
    Object.assign(elementInstance, this.attributes);
  }

}
