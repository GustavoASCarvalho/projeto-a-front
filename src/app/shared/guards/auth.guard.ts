import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, catchError, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLogged().pipe(
    map((res) => {
      if (!res) {
        router.navigateByUrl('/signin');
        return false;
      }
      if (res.statusCode === 200) {
        return true;
      } else {
        router.navigateByUrl('/signin');
        return false;
      }
    }),
    catchError((_) => {
      router.navigateByUrl('/signin');
      return new Observable<boolean>((observer) => {
        observer.next(false);
      });
    }),
  );
};
