import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from './table-view/table-view.component';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from './loader/loader.component';
// import { LoaderComponent } from './loader/loader.component'; 

@NgModule({
  declarations: [TableViewComponent, LoaderComponent],
  imports: [CommonModule, MatIconModule],
  exports: [TableViewComponent, MatIconModule, LoaderComponent],
})
export class SharedModule {}
