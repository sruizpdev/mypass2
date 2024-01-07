import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent {
  editForm = new FormGroup({
    id: new FormControl(''),
    owner: new FormControl('', [Validators.required]),
    site: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    notes: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    //todo: hay que darle un tipo a val , por ejemplo usando una interfaz

    this.activatedRoute.queryParams.subscribe((val: any) => {
      console.log(val);
      this.editForm.patchValue({
        id: val.id,
        owner: val.owner,
        site: val.site,
        username: val.username,
        password: val.password,
        notes: val.notes,
      });
    });
  }
  onSubmit() {
    const data = {
      id: this.editForm.value.id!,
      owner: this.editForm.value.owner?.trim(),
      site: this.editForm.value.site?.trim(),
      username: this.editForm.value.username?.trim(),
      password: this.editForm.value.password?.trim(),
      notes: this.editForm.value.notes?.trim(),
    };

    let errorMessage = '';

    if (this.editForm.invalid) {
      if (this.editForm.get('owner')?.hasError('required')) {
        errorMessage += 'Por favor, seleccione un propietario.\n';
      }
      if (this.editForm.get('site')?.hasError('required')) {
        errorMessage += 'Por favor, introduzca un sitio o app.\n';
      }
      if (this.editForm.get('username')?.hasError('required')) {
        errorMessage += 'Por favor, introduzca un nombre de usuario.\n';
      }
      if (this.editForm.get('password')?.hasError('required')) {
        errorMessage += 'Por favor, introduzca un password.\n';
      }
      if (errorMessage) {
        alert(errorMessage);
      }
    } else {
      const res = confirm('¿Está seguro?');
      if (res) {
        this.userService
          .update(this.editForm.value.id!, data)
          .then((res) => {
            this.router.navigate(['/home']);
          })
          .catch((err) => console.log(err));
      }
    }
  }
  clearForm(): void {
    this.editForm.patchValue({ site: '', username: '', password: '' });
    console.log('borrado');
  }
  delete() {
    const res = confirm('¿Está seguro?');

    if (res) {
      this.userService
        .delete(this.editForm.value.id!)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch((err) => console.log(err));
    }
  }
}
