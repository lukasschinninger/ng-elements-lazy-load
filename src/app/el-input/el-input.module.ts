import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ElInputComponent} from './el-input.component';
import {LazyElementModule} from '../../../projects/ls-ng-extension/src/lib/ng-elements-proxy';


@NgModule({
  declarations: [ElInputComponent],
  exports: [ElInputComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [ElInputComponent]
})
export class ElInputModule implements LazyElementModule {
  elementComponent = ElInputComponent;
}
