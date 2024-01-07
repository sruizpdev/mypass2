import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user.service';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  data$!: Observable<any[]>;
  data:any[]=[]
  filteredData: any[] = [];
  searchTerm: string = '';

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.data$ = this.userService.getAll();
    this.data$.subscribe((res) => {
      this.filteredData = res;
      this.data=res
    });
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

  onSearch() {
    this.filteredData = this.data.filter((item) =>
      item.site.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
   
  }
}
