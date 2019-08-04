import {NgModuleFactory, Type} from '@angular/core';
import {Observable} from 'rxjs';
import {LazyElementModuleInterface} from './lazy-element-module.interface';


export type ElementModuleResolver = () => Type<LazyElementModuleInterface>
  | NgModuleFactory<LazyElementModuleInterface>
  | Observable<Type<LazyElementModuleInterface>>
  | Promise<NgModuleFactory<LazyElementModuleInterface>
  | Type<LazyElementModuleInterface>
  | LazyElementModuleInterface>;


export interface ElementRegistry {

  [name: string]: ElementModuleResolver;
}


export type ElementRegistryFactory = () => ElementRegistry;
