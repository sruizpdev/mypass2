import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewComponent {
  newForm = new FormGroup({
    owner: new FormControl(''),
    site: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    notes: new FormControl(''),
  });

  userService = inject(UserService);
  router = inject(Router);

  onSubmit() {
    console.log('estos son los campos del formulario neew',this.newForm.value);
    
    this.userService
      .addNew(this.newForm.value)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        console.log(err);
      });

    
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
