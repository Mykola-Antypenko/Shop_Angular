import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import * as RouterActions from '../../../core/@ngrx/router/router.actions';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss']
})
export class GoBackComponent {
  constructor(private store: Store) {}

  goBack(): void {
    this.store.dispatch(RouterActions.goBack());
  }
}
