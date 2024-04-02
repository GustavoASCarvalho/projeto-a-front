import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  categories = [] as any[];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.list().subscribe((data) => {
      data.data.map((category) => {
        this.categories.push({ ...category, selected: false });
      });
    });
  }
}
