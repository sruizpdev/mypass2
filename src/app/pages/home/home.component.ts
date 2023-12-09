import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  data!: Observable<Array<any>>;

  constructor(private userService: UserService) {
    this.data = this.userService.getAll();
  }

  delete(id: string) {
    const res = confirm('¿Está seguro?');

    if (res) {
      this.userService
        .delete(id)
        .then(() => {
          console.log('Acción confirmada');
        })
        .catch((err) => console.log(err));
    } 
  }
}
