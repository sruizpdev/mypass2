import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  newForm = new FormGroup({
    id: new FormControl(''),
    owner: new FormControl(''),
    site: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
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
      this.newForm.patchValue({
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
    this.userService
      .update(this.newForm.value.id!, this.newForm.value)
      .then((res) => {
        console.log('actualizado');
        this.router.navigate(['/home']);
      })
      .catch((err) => console.log(err));
    // this.userService.login(this.loginForm.value);
    console.warn(this.newForm.value);
  }
  clearForm(): void {
    this.newForm.patchValue({ site: '', username: '', password: '' });
    console.log('borrado');
  }
}
