import { Injectable } from '@angular/core';
import { IConfigModel } from '../../models/config-model.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {
  configuration: Partial<IConfigModel> = {};

  constructor() { }

  setConfig(additionalConfig: Partial<IConfigModel>) {
    this.configuration = { ...this.configuration, ...additionalConfig };
  }

  getConfig(): Partial<IConfigModel> {
    return this.configuration;
  }

  setConfigProperty(key: keyof IConfigModel, value: any): void {
    this.configuration[key] = value;
  }
}
