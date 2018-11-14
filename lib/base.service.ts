import { Inject, Injectable } from '@nestjs/common';

import { BASE_MODULE_OPTIONS } from './base.constants';
import { BaseModuleOptions } from './base.interfaces';

@Injectable()
export class BaseService {

  constructor(
    @Inject(BASE_MODULE_OPTIONS) private readonly options: BaseModuleOptions,
  ) {}
}
