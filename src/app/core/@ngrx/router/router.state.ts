import type { Params } from '@angular/router';
import type { RouterReducerState } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface RouterState {
  router: RouterReducerState<RouterStateUrl>;
}
