import { createAction, props } from '@ngrx/store';

export const goBack = createAction('[Router] BACK');
export const navigate = createAction(
  '[Router] NAVIGATE',
  props<{ path: any[]; queryParams?: object; }>()
);

export const goHome = createAction(
  '[Router] GO_HOME'
);
