import { CanDeactivateFn } from '@angular/router';
import { Profile } from '../../features/account/profile/profile';

export const profileUnsavedGuard: CanDeactivateFn<Profile> = (component) => {
  return component.canDeactivate();
};