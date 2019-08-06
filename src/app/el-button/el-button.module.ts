import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ElButtonComponent} from './el-button.component';
import {ButtonModule} from 'primeng/button';
import {LazyElementModule} from '../../../projects/ng-elements-proxy/src/lib/interfaces/lazy-element-module.interface';


@NgModule({
  declarations: [ElButtonComponent],
  exports: [ElButtonComponent],
  imports: [
    CommonModule,
    ButtonModule
  ],
  entryComponents: [ElButtonComponent]
})
export class ElButtonModule implements LazyElementModule {
  elementComponent = ElButtonComponent;


}
