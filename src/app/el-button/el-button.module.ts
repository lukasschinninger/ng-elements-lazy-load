import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ElButtonComponent} from './el-button.component';
import {ButtonModule} from 'primeng/button';
import {LazyElementModule} from '../../../projects/ls-ng-extension/src/lib/ng-elements-proxy';


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
