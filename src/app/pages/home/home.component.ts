import { collectionData } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../user';
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
}
