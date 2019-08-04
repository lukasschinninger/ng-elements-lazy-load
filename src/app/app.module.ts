import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ElementsProxyModule} from './elements-proxy/elements-proxy.module';
import {ElementRegistry} from './elements-proxy/elements-registry.interface';


export function elementRegistryFactory(): ElementRegistry {
  return {
    'el-button': () => import('./el-button/el-button.module').then(m => m.ElButtonModule),
    'el-input': () => import('./el-input/el-input.module').then(m => m.ElInputModule)
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ElementsProxyModule.forRoot(elementRegistryFactory)
  ],
  providers: [],
  bootstrap: [],
  exports: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule {

  public constructor(private injector: Injector) {
  }


  // override default bootstrap Logic !!!!
  ngDoBootstrap() {

  }

}
