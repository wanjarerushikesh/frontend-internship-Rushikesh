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
  // Define class properties
  isLoading = 'initial';
  subjectName: string = '';
  allBooks: Book[] = [];
  errorMessage: string = '';

  // Inject required services
  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService,
    private location: Location
  ) {}

  // Fetch all books for a given subject
  getAllBooks() {
    const cachedResponse = localStorage.getItem(this.subjectName);
    if (cachedResponse) {
      // Use cached data if available
      this.allBooks = JSON.parse(cachedResponse);
      this.isLoading = 'completed';
    } else {
      // Fetch data from API if not available in cache
      this.subjectsService.getAllBooks(this.subjectName).subscribe(
        (data) => {
          this.allBooks = data?.works;
          this.isLoading = 'completed';
          // Store data in cache
          localStorage.setItem(this.subjectName, JSON.stringify(data?.works));
        },
        (err) => {
          this.errorMessage = err.message;
          this.isLoading = 'completed';
        }
      );
    }
  }

  // Navigate back to previous location
  goBack() {
    this.location.back();
  }

  // Subscribe to route parameter changes to get the subject name and fetch all books
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.isLoading = 'loading';
      this.getAllBooks();
    });
  }
}
