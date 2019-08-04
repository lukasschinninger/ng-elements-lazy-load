import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ElButtonComponent} from './el-button.component';
import {LazyElementModuleInterface} from '../elements-proxy/lazy-element-module.interface';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [ElButtonComponent],
  exports: [ElButtonComponent],
  imports: [
    CommonModule,
    ButtonModule
  ],
  entryComponents: [ElButtonComponent]
})
export class ElButtonModule implements LazyElementModuleInterface {
  elementComponent = ElButtonComponent;


}
