// import { CanActivateFn } from '@angular/router';

// export const adminAuthGuard: CanActivateFn = (route, state) => {
//   return true;
// };

// admin-auth.guard.ts
// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AdminAuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     if (this.authService.isAdmin()) {
//       return true;
//     } else {
//       this.router.navigate(['/login']); // Redirect to login page or unauthorized page
//       return false;
//     }
//   }
// }

// admin-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
      return true;
    } else {
      this.router.navigate(['/home']); // Redirect to home page if not admin
      return false;
    }
  }
}
