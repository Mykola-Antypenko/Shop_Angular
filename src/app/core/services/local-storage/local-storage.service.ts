import { Injectable, InjectionToken } from '@angular/core';

export const localStorage = new InjectionToken<object>('localStorage');

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    window.localStorage.setItem(key, value);
    console.log(`The key ${key} with value ${value} was set`);
  }

  getItem(key: string): void {
    console.log(window.localStorage.getItem(key));
  }

  removeItem(key: string): void {
    window.localStorage.removeItem(key)
    console.log(`The key ${key} was removed`);
  }

  clear(): void {
    window.localStorage.clear();
    console.log('The local storage was cleared');
  }

  getLength() {
    console.log(`Count of elements in storage: ${window.localStorage.length}`);
  }
}

export const localStorageInstance = new LocalStorageService();
