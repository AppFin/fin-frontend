import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  console.log('ss');
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.currentUser();

  if (!user || !user.isAdmin) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
