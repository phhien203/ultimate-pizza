import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const navigate = createAction(
  '[Router] Navigate',
  props<{ payload: { path: any[]; query?: object; extras?: NavigationExtras }}>()
);

export const back = createAction('[Router] Back');

export const forward = createAction('[Router] Forward');
