import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewComponent {
  newForm = new FormGroup({
    owner: new FormControl('', [Validators.required]),
    site: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    notes: new FormControl(''),
  });

  userService = inject(UserService);
  router = inject(Router);

  onSubmit() {
    const data = {
      owner: this.newForm.value.owner?.trim(),
      site: this.newForm.value.site?.trim(),
      username: this.newForm.value.username?.trim(),
      password: this.newForm.value.password?.trim(),
      notes: this.newForm.value.notes?.trim(),
    };
    let errorMessage = '';

    if (this.newForm.invalid) {
      if (
        this.newForm.get('owner')?.hasError('required') 
      ) {
        errorMessage += 'Por favor, seleccione un propietario.\n';
      }
      if (
        this.newForm.get('site')?.hasError('required') 
      ) {
        errorMessage += 'Por favor, introduzca un sitio o app.\n';
      }
      if (
        this.newForm.get('username')?.hasError('required')
      ) {
        errorMessage += 'Por favor, introduzca un nombre de usuario.\n';
      }
      if (
        this.newForm.get('password')?.hasError('required')
      ) {
        errorMessage += 'Por favor, introduzca un password.\n';
      }
      if (errorMessage) {
        alert(errorMessage);
      }
    } else {
      this.userService
        .addNew(data)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  clearForm(): void {
    this.newForm.patchValue({
      owner: '',
      site: '',
      username: '',
      password: '',
      notes: '',
    });
  }
}
