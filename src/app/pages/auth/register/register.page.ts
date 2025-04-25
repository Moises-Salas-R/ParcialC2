import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone:false
})
export class RegisterPage {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: [''],
      apellido: [''],
      telefono: [''],
      email: [''],
      password: ['']
    });
  }

  async onSubmit() {
    const { nombre, apellido, telefono, email, password } = this.form.value;
    const user = await this.authService.register(email, password);
    if (user) {
      await this.authService.saveUserData(user.uid, { nombre, apellido, telefono, email });
      this.router.navigate(['/home']);
    } else {
      alert('Error al registrar usuario');
    }
  }
}
