import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ExternalAuthService } from "src/app/core/services/external-auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone:false
})
export class LoginPage {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private externalAuthService: ExternalAuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  

  async onLogin() {
    const { email, password } = this.form.value;
    const user = await this.authService.login(email, password);
    if (user) {
      this.router.navigate(['/home']);

      this.externalAuthService.loginToExternalServer(email, password).subscribe((res) => {
        localStorage.setItem('externalToken', res.token);
      });

    } else {
      alert('Credenciales incorrectas');
    }
  }
  
}
