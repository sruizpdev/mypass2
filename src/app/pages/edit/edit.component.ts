import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent {
  newForm = new FormGroup({
    site: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: ActivatedRoute) {
    
    //todo: hay que darle un tipo a val , por ejemplo usando una interfaz 

    this.router.queryParams.subscribe((val: any) => {
      console.log(val);
      this.newForm.patchValue({
        site: val.site,
        username: val.username,
        password: val.password,
      });
    });
  }
  onSubmit() {
    // this.userService.login(this.loginForm.value);
    console.warn(this.newForm.value);
  }
  clearForm(): void {
    this.newForm.patchValue({ site: '', username: '', password: '' });
    console.log('borrado');
  }
}
