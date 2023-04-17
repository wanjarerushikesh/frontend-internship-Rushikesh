import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
// import { BookResponse } from '../../models/book-response.model';
import { SearchResponse } from '../../models/search-response.models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private apiService: ApiService) {}

  getBooksByAuthor(searchKey: string, offset:number, limit:number): Observable<SearchResponse> {
    console.log("searchkey",searchKey);
    return this.apiService.get(
      `/search.json?q=${searchKey}&offset=${offset}&limit=${limit}`
    );
  }
}
