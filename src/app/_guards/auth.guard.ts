import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyjsService } from '../_services/alertifyjs.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyjsService ) { }
  canActivate(next: ActivatedRouteSnapshot): boolean {
      const roles = next.firstChild.data['roles'] as Array<string>;
      if (roles) {
        const match = this.authService.checkRole(roles);
        if (match) {
          return true;
        } else {
          this.router.navigate(['/members']);
          this.alertify.error('You are not authorized to access this!');
        }
      }

      if (this.authService.loggedIn()) {
        return true;
      }

    this.alertify.error('You are not authorized!');
    this.router.navigate(['']);
    return false;
  }
}
