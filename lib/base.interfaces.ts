import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface BaseModuleOptions {
  someValue?: string;
}

export interface BaseModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<BaseModuleOptionsFactory>;
  useClass?: Type<BaseModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<BaseModuleOptions> | BaseModuleOptions;
  inject?: any[];
}

export interface BaseModuleOptionsFactory {
  createBaseOptions(): Promise<BaseModuleOptions> | BaseModuleOptions;
}
