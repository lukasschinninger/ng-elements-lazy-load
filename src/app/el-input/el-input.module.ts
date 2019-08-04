import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ElInputComponent} from './el-input.component';
import {LazyElementModuleInterface} from '../elements-proxy/lazy-element-module.interface';


@NgModule({
  declarations: [ElInputComponent],
  exports: [ElInputComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [ElInputComponent]
})
export class ElInputModule implements LazyElementModuleInterface {
  elementComponent = ElInputComponent;
}
