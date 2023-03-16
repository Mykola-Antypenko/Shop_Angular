import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

import * as RouterActions from './router.actions';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.navigate),
        tap(action => {
          const { path, queryParams } = { ...action };
          this.router.navigate(path, { queryParams });
        })
      ), {
      dispatch: false,
    }
  );

  navigateBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.goBack),
        tap(() => this.location.back())
      ), {
      dispatch: false,
    }
  );

  navigateHome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.goHome),
        tap(() => {
          this.router.navigate(['/']);
        })
      ), {
      dispatch: false,
    }
  );
}
