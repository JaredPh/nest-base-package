import { DynamicModule, Module } from '@nestjs/common';

import { BaseModuleAsyncOptions, BaseModuleOptions } from './base.interfaces';
import { BaseCoreModule } from './base.core-module';

@Module({})
export class BaseModule {
  static forRoot(options?: BaseModuleOptions): DynamicModule {
    return {
      module: BaseModule,
      imports: [BaseCoreModule.forRoot(options)],
    };
  }

  static forRootAsync(options: BaseModuleAsyncOptions): DynamicModule {
    return {
      module: BaseModule,
      imports: [BaseCoreModule.forRootAsync(options)],
    };
  }
}
