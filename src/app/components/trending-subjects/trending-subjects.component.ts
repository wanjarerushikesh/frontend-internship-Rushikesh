import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SubjectsService } from '../../core/services/subjects.service';
import { Book } from 'src/app/core/models/book-response.model';
import { Location } from '@angular/common';

@Component({
  selector: 'front-end-internship-assignment-trending-subjects',
  templateUrl: './trending-subjects.component.html',
  styleUrls: ['./trending-subjects.component.scss'],
})
export class TrendingSubjectsComponent implements OnInit {
  isLoading: boolean = true;

  subjectName: string = '';

  allBooks: Book[] = [];

  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService,
    private location: Location
  ) {}

  getAllBooks() {
    const cachedResponse = localStorage.getItem(this.subjectName);
    if (cachedResponse) {
      this.allBooks = JSON.parse(cachedResponse);
      this.isLoading = false;
    } else {
      this.subjectsService.getAllBooks(this.subjectName).subscribe(
        (data) => {
          this.allBooks = data?.works;
          this.isLoading = false;
          localStorage.setItem(
            this.subjectName,
            JSON.stringify(data?.works)
          );
        },
        (err) => {
          this.errorMessage = err.message;
          this.isLoading = false;
        }
      );
    }
  }
  goBack() {
    this.location.back();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.isLoading = true;
      this.getAllBooks();
    });
  }
}
