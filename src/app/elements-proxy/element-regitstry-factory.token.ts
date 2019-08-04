import {InjectionToken} from '@angular/core';
import { ElementRegistryFactory} from './elements-registry.interface';

export const ELEMENT_REGISTRY_FACTORY = new InjectionToken<ElementRegistryFactory>('ELEMENT_REGISTRY_FACTORY');
