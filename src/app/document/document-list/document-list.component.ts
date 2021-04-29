import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Document} from '../document';
import {Sort} from '@lagoshny/ngx-hal-client';
import {DocumentService} from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  public documents: Document[] = [];
  public pageSize = 6;
  public page = 1;
  public totalDocuments = 0;
  private sorting: Sort[] = [{ path: 'id', order: 'ASC' }];

  constructor(private router: Router,
              private location: Location,
              private documents: DocumentService) { }

  ngOnInit(): void {
    this.documentsService.getAll({size: this.pageSize, sort: this.sorting, params: [{key: 'page', value: 0}]}).subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.totalDocuments = this.documentsService.totalElement();
      });
  }

  changePage(): void {
    this.documentsService.page(this.page - 1).subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      });
  }

}
