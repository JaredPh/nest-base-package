import { DynamicModule, Global, Inject, Module, Provider } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { BASE_MODULE_OPTIONS } from './base.constants';
import { BaseModuleAsyncOptions, BaseModuleOptions, BaseModuleOptionsFactory } from './base.interfaces';
import { BaseService } from './base.service';

@Global()
@Module({})
export class BaseCoreModule {
  constructor(
    @Inject(BASE_MODULE_OPTIONS)
    private readonly options: BaseModuleOptions,
    private readonly moduleRef: ModuleRef,
  ) {}

  static forRoot(options: BaseModuleOptions = {}): DynamicModule {
    const baseModuleOptions = {
      provide: BASE_MODULE_OPTIONS,
      useValue: options,
    };

    return {
      module: BaseCoreModule,
      providers: [
        baseModuleOptions,
        BaseService,
      ],
      exports: [BaseService],
    };
  }

  static forRootAsync(options: BaseModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);

    return {
      module: BaseCoreModule,
      imports: options.imports,
      providers: [
        ...asyncProviders,
        BaseService,
      ],
      exports: [
        BaseService,
      ],
    };
  }

  private static createAsyncProviders(
    options: BaseModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: BaseModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: BASE_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: BASE_MODULE_OPTIONS,
      useFactory: async (optionsFactory: BaseModuleOptionsFactory) =>
        await optionsFactory.createBaseOptions(),
      inject: [options.useClass || options.useExisting],
    };
  }
}
