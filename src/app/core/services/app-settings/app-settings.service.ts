import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { IAppSettings } from './app-settings.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  defaultSettings: IAppSettings = {
    sortKey: 'name',
    isAsc: false,
  }

  constructor(private localStorageService: LocalStorageService, private httpClient: HttpClient) {
  }

  getSettingsFromLocal(): Observable<IAppSettings> {
    return this.httpClient.get<IAppSettings>('assets/app-settings.json').pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getSettings(): Observable<IAppSettings> {
    let settings: IAppSettings = this.defaultSettings;
    let settingsFromStorage = this.getSettingsFromStorage('sortSettings');

    if (settingsFromStorage) {
      settings = JSON.parse(settingsFromStorage);
      return of(settings);
    } else {
      return this.getSettingsFromLocal().pipe(
        catchError(() => {
          return of(this.defaultSettings);
        })
      );
    }
  }

  getSettingsFromStorage(key: string): string {
    return this.localStorageService.getItem(key);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
