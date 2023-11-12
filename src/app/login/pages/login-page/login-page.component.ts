import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../shared/services/authentication.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class LoginPageComponent {
  loginFormControl = new FormControl<string | null>(null, [Validators.required]);
  passwordFormControl = new FormControl<string | null>(null, [Validators.required]);

  submitted = false;

  constructor(private authenticationService: AuthenticationService) {
  }

  authenticate(): void {
    this.submitted = true;
    if (!this.loginFormControl.valid && !this.passwordFormControl.valid) {
      return;
    }

    this.authenticationService.authenticate({
      username: this.loginFormControl.value as string,
      password: this.passwordFormControl.value as string
    }).subscribe({
      next: data => console.log(data)
    });
  }
}
