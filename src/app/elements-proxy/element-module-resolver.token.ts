import {InjectionToken} from '@angular/core';
import {ElementModuleResolver} from './elements-registry.interface';

export const ELEMENT_MODULE_RESOLVER = new InjectionToken<ElementModuleResolver>('ELEMENT_MODULE_RESOLVER');
