import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  userService = inject(UserService);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl(''),
  });
  onSubmit() {
    //todo: hay que comprobar que el formulario no viene vacio
    this.userService
      .login(this.loginForm.value.email!, this.loginForm.value.password!)
      .then(() => {
        console.log('Login success');
      })
      .catch((err) => {
        console.log(err);
      });

    console.warn(this.loginForm.value);
  }
  clearForm(): void {
    this.loginForm.patchValue({ email: '', password: '' });
    console.log('borrado');
  }
}
