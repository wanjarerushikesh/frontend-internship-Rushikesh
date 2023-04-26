import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { DocsData } from 'src/app/core/models/search-response.models';
import { SearchService } from 'src/app/core/services/search/search.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Define class properties
  bookSearch: FormControl;
  isLoading = 'initial';
  searchKey = '';
  allBooksDetails: DocsData[] = [];
  offset = 0;
  limit = 10;
  errorMessage = '';

  // Trending subjects to display on the page
  trendingSubjects = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  // Create a new FormControl instance to handle user input
  constructor(private searchService: SearchService) {
    this.bookSearch = new FormControl('');
  }

  // Function to get books by author with an offset and limit
  getBooksByAuthor(offset: number, limit: number) {
    // Check if cached response exists
    const cachedResponse = localStorage.getItem(
      this.searchKey + offset + limit
    );
    if (cachedResponse) {
      // Use cached response if it exists
      this.allBooksDetails = JSON.parse(cachedResponse);
      this.isLoading = 'completed';
    } else {
      // Call the search service to get books by author
      this.searchService
        .getBooksByAuthor(this.searchKey, offset, limit)
        .subscribe(
          (data) => {
            // Set the results to class property
            this.allBooksDetails = data?.docs;
            this.isLoading = 'completed';

            // Store the results in cache if searchKey is not null
            if (this.searchKey !== null) {
              localStorage.setItem(
                this.searchKey + offset + limit,
                JSON.stringify(data?.docs)
              );
            }
          },
          (err) => {
            // Set error message on failure
            this.errorMessage = err.message;
            this.isLoading = 'completed';
          }
        );
    }
  }

  ngOnInit(): void {
    // Subscribe to value changes of the book search input
    this.bookSearch.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value: string) => {
        if (value !== null) {
          this.searchKey = value;
        }
        // Reset offset and set loading to true
        this.offset = 0;
        this.isLoading = 'loading';
        this.getBooksByAuthor(this.offset, this.limit);
      });
    // invalidate cache on unload event
    window.addEventListener('unload', () => {
      localStorage.clear();
    });
  }

  // Function to get the next page of books
  getNextPage() {
    this.offset += this.limit;
    this.isLoading = 'loading';
    this.getBooksByAuthor(this.offset, this.limit);
  }

  // Function to get the previous page of books
  getPreviousPage() {
    this.offset -= this.limit;
    this.isLoading = 'loading';
    this.getBooksByAuthor(this.offset, this.limit);
  }
}