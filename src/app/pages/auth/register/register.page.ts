import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone:false,
})
export class RegisterPage {
  name = '';
  lastname = '';
  phone = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    try {
      await this.authService.register(this.email, this.password, {
        name: this.name,
        lastname: this.lastname,
        phone: this.phone
      });
      this.router.navigate(['/login']);//desde
      this.authService.getCurrentUser().subscribe(user => {
        if (user) {
          this.router.navigate(['/home']);
        }
      });//hasta
    } catch (err) {
      console.error('Error en registro:', err);
    }
  }
}
