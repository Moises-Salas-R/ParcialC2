import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ExternalApiService } from 'src/app/core/services/external-api.service'; // ajustá el path si es necesario


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone:false,
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router,private externalApiService: ExternalApiService,) {}

  async login() {
    try {

      this.externalApiService.loginToExternalApi({
        email: 'correo@institucional.com',
        password: '123456'
      }).subscribe(response => {
        this.externalApiService.saveToken(response.token);
      });

      await this.authService.login(this.email, this.password);
      this.router.navigate(['/home']);//desde
      this.authService.getCurrentUser().subscribe(user => {
        if (user) {
          this.router.navigate(['/home']);
        }
      }); // Lo creamos más adelante hasta
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
    }

    
  }

  
  
}
