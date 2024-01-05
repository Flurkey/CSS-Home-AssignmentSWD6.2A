import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginComponent {
  constructor(private registrationService: RegistrationService, private router: Router) { }

  email: string = '';
  password: string = '';
  invalidCredentials: boolean = false;
  errorMessage: string = '';

  login() {

    if (!this.email.trim() || !this.password.trim()) {
      this.invalidCredentials = true;
      this.errorMessage = 'Inputs cannot be left empty';
      return;
    }

    this.registrationService.authenticate(this.email, this.password).subscribe(
      (response: any) => {
        const token = response.accessToken
        localStorage.setItem('authToken', token);
        this.router.navigate(['/registration-list']);
      },
      (error: any) => {
        this.invalidCredentials = true;
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}
