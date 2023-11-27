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
    owner: new FormControl(''),
    site: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    notes: new FormControl(''),
  });
  onSubmit() {
    
    console.warn(this.newForm.value);
  }

  
  clearForm(): void {
    this.newForm.patchValue({
      owner: '',
      site: '',
      username: '',
      password: '',
      notes: '',
    });
    console.log('borrado');
  }
}
