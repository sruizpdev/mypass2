import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  faUser = faUser;
  faLock = faLock;
  loginErr = false;
  userService = inject(UserService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.userService
      .login(this.loginForm.value.email!, this.loginForm.value.password!)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.loginErr = false;
        this.router.navigate(['home']);
      })
      .catch((err) => {
        console.log(err);
        this.loginErr = true;
      });
  }
  clearForm(): void {
    this.loginForm.patchValue({ email: '', password: '' });
    console.log('borrado');
  }
}
