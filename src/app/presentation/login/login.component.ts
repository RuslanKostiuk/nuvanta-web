import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '@application/services';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;

  private _fb = inject(FormBuilder);
  private _loginService = inject(LoginService);
  readonly loading = this._loginService.loading;
  readonly error = this._loginService.error;
  private readonly _router = inject(Router);

  ngOnInit(): void {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this._loginService.login(this.form.value).subscribe({
      next: () => {
        this._router.navigate(['/dashboard']);
      },
    });
  }

}
