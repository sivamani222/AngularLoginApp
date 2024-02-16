import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('email')) {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(['login']);
  }
};

// export const authGuard: CanActivateFn = (route, state) => {
//   const isAdmin = sessionStorage.getItem('isAdmin'); // Retrieve isAdmin flag from sessionStorage
//   if (sessionStorage.getItem('email') && isAdmin === 'true') {
//     // Check if user is logged in and isAdmin flag is true
//     return true;
//   } else {
//     const router = new Router();
//     router.navigate(['login']);
//     return false;
//   }
// };
