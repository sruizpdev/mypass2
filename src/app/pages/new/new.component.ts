import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewComponent {
  newForm = new FormGroup({
    site: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });
  onSubmit() {
    // this.userService.login(this.loginForm.value);
    console.warn(this.newForm.value);
  }
  clearForm(): void {
     this.newForm.patchValue({ site:'',username: '', password: '' });
    console.log('borrado');
  }
}
