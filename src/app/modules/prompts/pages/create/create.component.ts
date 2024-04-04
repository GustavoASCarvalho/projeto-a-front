import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit, AfterViewInit {
  @ViewChild('highlights') highlights: ElementRef<any> | undefined;
  @ViewChild('backdrop') backdrop: ElementRef<any> | undefined;
  @ViewChild('textarea') textarea: ElementRef<any> | undefined;
  categories = [] as any[];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.list().subscribe((data) => {
      data.data.map((category) => {
        this.categories.push({ ...category, selected: false });
      });
    });
  }

  ngAfterViewInit(): void {
    if (this.textarea && this.highlights) {
      this.textarea.nativeElement.addEventListener('input', () => {
        const highlightedText = this.applyHighlights(
          this.textarea!.nativeElement.value,
        );
        this.highlights!.nativeElement.innerHTML = highlightedText;
      });
      this.textarea.nativeElement.addEventListener('scroll', () => {
        const scrollTop = this.textarea?.nativeElement.scrollTop;
        this.backdrop!.nativeElement.scrollTop = scrollTop;
      });
    }
  }

  applyHighlights(text: string) {
    console.log('text', text);
    console.log(
      'nex text',
      text.replace(/\n/g, '<br>').replace(/[A-Z].*?\b/g, '<mark>$&</mark>'),
    );
    return text
      .replace(/\n/g, '<br>')
      .replace(/[A-Z].*?\b/g, '<mark>$&</mark>');
  }
}
