import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  confirm(message?: string): boolean {
    const confirmation = window.confirm(message || 'Are you sure you want to leave without saving the data?');

    return confirmation;
  };
}
