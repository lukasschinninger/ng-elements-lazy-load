import {NgModuleFactory, Type} from '@angular/core';
import {Observable} from 'rxjs';
import {LazyElementModule} from './lazy-element-module.interface';


export type ElementModuleResolver = () => Type<LazyElementModule>
  | NgModuleFactory<LazyElementModule>
  | Observable<Type<LazyElementModule>>
  | Promise<NgModuleFactory<LazyElementModule>
  | Type<LazyElementModule>
  | LazyElementModule>;


export interface ElementRegistry {

  [name: string]: ElementModuleResolver;
}


export type ElementRegistryFactory = () => ElementRegistry;
