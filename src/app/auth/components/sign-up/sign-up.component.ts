import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { emailValidator } from '../../helpers/email-validator';
import { passwordValidator } from '../../helpers/password-validator';
import { passwordMatchValidator } from '../../helpers/password-match-validator';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
  ],
})
export class SignUpComponent {
  public signUpForm: FormGroup;

  public isFirstClick = false;

  public isLoading = false;

  public isSubmitDisabled = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, emailValidator]],
        password: ['', [Validators.required, passwordValidator]],
        repeatPassword: ['', [Validators.required, passwordValidator]],
      },
      { validator: passwordMatchValidator }
    );

    this.signUpForm.valueChanges.subscribe(() => {
      this.isSubmitDisabled = Object.values(this.signUpForm.value).some(
        (val) => val !== ''
      );
    });
  }

  public onSubmit(): void {
    if (!this.isFirstClick) {
      this.isFirstClick = true;
    }

    if (this.signUpForm.valid) {
      this.isLoading = true;

      const email = this.signUpForm.get('email')?.value;
      const password = this.signUpForm.get('password')?.value;
      const password_confirmation =
        this.signUpForm.get('repeatPassword')?.value;

      this.authService
        .signUp(email, password, password_confirmation)
        .subscribe((data) => {
          if (!data.success && data.reason === 'invalidUniqueKey') {
            this.signUpForm.get('email')?.setErrors({ emailExists: true });

            this.isLoading = false;
          } else {
            this.navigateTo('/');
          }
        });
    }
  }

  public navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
