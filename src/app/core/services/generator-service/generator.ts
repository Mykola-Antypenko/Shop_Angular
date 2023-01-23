import { Injectable } from '@angular/core';
import { genId } from '../gen-id/gen-id.generator';

@Injectable()
export class GeneratorService {

  constructor() { }

  generate(n: number): string {
    const charactersSet ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    const charactersLength = charactersSet.length;
    for ( let i = 0; i < n; i++ ) {
      randomString += charactersSet.charAt(Math.floor(Math.random() * charactersLength));
    }

    return randomString;
  }

  getNewId(): number {
    return genId();
  }
}
