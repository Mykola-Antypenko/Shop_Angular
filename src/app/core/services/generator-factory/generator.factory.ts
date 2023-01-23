import { InjectionToken } from '@angular/core';
import { GeneratorService } from '../generator-service/generator';

export const generatedString = new InjectionToken<string>('generatedString');

export function GeneratorFactory(length: number ): (genService: GeneratorService) => string {
  return (genService: GeneratorService): string => {
    return genService.generate(length);
  }
}

