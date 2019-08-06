import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ElementRegistry} from '../../projects/ng-elements-proxy/src/lib/interfaces/elements-registry.interface';
import {LazyElementsProxyModule} from '../../projects/ng-elements-proxy/src/lib/lazy-elements-proxy.module';
import {LsNgExtensionModule} from '../../projects/ls-ng-extension/src/lib/ls-ng-extension.module';



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
    LazyElementsProxyModule.forRoot(elementRegistryFactory),
    LsNgExtensionModule
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
