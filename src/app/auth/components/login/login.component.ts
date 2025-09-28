import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth.service';
import { emailValidator } from '../../helpers/email-validator';
import { passwordValidator } from '../../helpers/password-validator';
import { spaceValidator } from '../../helpers/space-validator';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
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
export class LoginComponent {
  public loginForm: FormGroup;

  public isFirstClick = false;

  public isLoading = false;

  public isSubmitDisabled = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly store: Store,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, spaceValidator, passwordValidator]],
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.isSubmitDisabled = Object.values(this.loginForm.value).some(
        (val) => val !== ''
      );
    });
  }

  public onSubmit(): void {
    if (!this.isFirstClick) {
      this.isFirstClick = true;
    }

    if (this.loginForm.valid) {
      this.isLoading = true;

      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.signIn(email, password).subscribe((data) => {
        if (data.success) {
          this.navigateTo('/');
        } else {
          this.isLoading = false;

          this.loginForm.get('email')?.setErrors({ incorrect: true });
          this.loginForm.get('password')?.setErrors({ incorrect: true });
        }
      });
    }

    this.cdr.markForCheck();
  }

  public navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
