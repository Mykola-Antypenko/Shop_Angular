import { Injectable, InjectionToken } from '@angular/core';

export const appConst = new InjectionToken<object>('appConst');

@Injectable()
export class ConstantsService {
  appConstants: object = {
    app: 'BuyPhone',
    version: '1.0',
    api_url: 'http://localhost:4200/',
  }

  constructor() { }
}

export const constantsInstance = new ConstantsService();
