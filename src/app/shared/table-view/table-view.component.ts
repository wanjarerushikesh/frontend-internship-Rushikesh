import { Component, Input } from '@angular/core';
import { Book } from 'src/app/core/models/book-response.model';
import { DocsData } from 'src/app/core/models/search-response.models';

@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  @Input() booksList: Book[] = [];
  @Input() subjectName: string = '';
  
  //home Component
  @Input() allBooksDetails: DocsData[]=[];
  @Input() searchKey:string = '';

  
}
