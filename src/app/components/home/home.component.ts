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
  bookSearch: FormControl;
  isLoading: boolean = false;
  searchKey: string = '';
  allBooksDetails: DocsData[] = [];
  offset: number = 0;
  limit: number = 10;
  errorMessage: string = '';

  constructor(private searchService: SearchService) {
    this.bookSearch = new FormControl('');
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  getBooksByAuthor(offset: number, limit: number) {
    const cachedResponse = localStorage.getItem(
      this.searchKey + offset + limit
    );
    if (cachedResponse) {
      this.allBooksDetails = JSON.parse(cachedResponse);
      this.isLoading = false;
    } else {
      this.searchService
        .getBooksByAuthor(this.searchKey, offset, limit)
        .subscribe(
          (data) => {
            this.allBooksDetails = data?.docs;
            this.isLoading = false;
            if (this.searchKey !== null) {
              localStorage.setItem(
                this.searchKey + offset + limit,
                JSON.stringify(data?.docs)
              );
            }
          },
          (err) => {
            this.errorMessage = err.message;
            this.isLoading = false;
          }
        );
    }
  }

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value: string) => {
        if (value !== null) {
          this.searchKey = value;
        }
        this.offset = 0;
        this.isLoading = true;
        this.getBooksByAuthor(this.offset, this.limit);
      });
  }

  getNextPage() {
    this.offset += this.limit;
    this.isLoading = true;
    this.getBooksByAuthor(this.offset, this.limit);
  }

  getPreviousPage() {
    this.offset -= this.limit;
    this.isLoading = true;
    this.getBooksByAuthor(this.offset, this.limit);
  }
}

// sharerplay
// import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { Observable, debounceTime, filter, shareReplay } from 'rxjs';
// import { DocsData, SearchResponse } from 'src/app/core/models/search-response.models';
// import { SearchService } from 'src/app/core/services/search/search.service';

// @Component({
//   selector: 'front-end-internship-assignment-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss'],
// })
// export class HomeComponent implements OnInit {
//   bookSearch: FormControl;
//   isLoading: boolean = false;
//   searchKey: string = '';
//   allBooksDetails: DocsData[] = [];
//   offset: number = 0;
//   limit: number = 10;
//   errorMessage: string = '';
//   //searchResults$: Observable<SearchResponse>;  new property to hold the cached search results
//   searchResults$: Observable<SearchResponse> = new Observable<SearchResponse>();
//   constructor(private searchService:SearchService) {
//     this.bookSearch = new FormControl('');
//     // this.searchResults$ = new Observable<SearchResponse>();
//   }

//   trendingSubjects: Array<any> = [
//     { name: 'JavaScript' },
//     { name: 'CSS' },
//     { name: 'HTML' },
//     { name: 'Harry Potter' },
//     { name: 'Crypto' },
//   ];

//   getBooksByAuthor(offset: number, limit: number){
//     // Use shareReplay operator to cache the search results
//     this.searchResults$ = this.searchService.getBooksByAuthor(this.searchKey,offset, limit).pipe(
//       shareReplay({ refCount: true, bufferSize: 1 })
//     );
//     this.searchResults$.subscribe((data) => {
//       this.allBooksDetails = data?.docs
//       this.isLoading = false;
//     },
//     (err) => {
//       this.errorMessage = err.message;
//       this.isLoading = false;
//     });
//   }

//   ngOnInit(): void {
//     this.bookSearch.valueChanges
//       .pipe(
//         debounceTime(300),
//       ).
//       subscribe((value: string) => {
//         if(value !== null){
//         this.searchKey = value;
//       }
//         this.offset = 0;
//         this.isLoading = true;
//         this.getBooksByAuthor(this.offset, this.limit);
//       });
//   }

//   getNextPage() {
//     this.offset += this.limit;
//     this.isLoading = true;
//     this.getBooksByAuthor(this.offset, this.limit);
//   }

//   getPreviousPage() {
//     this.offset -= this.limit;
//     this.isLoading = true;
//     this.getBooksByAuthor(this.offset, this.limit);
//   }
// }
