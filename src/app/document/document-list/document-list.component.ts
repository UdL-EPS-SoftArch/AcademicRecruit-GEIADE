import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {DOC_TYPES, Document} from '../document';
import {Sort} from '@lagoshny/ngx-hal-client';
import {DocumentService} from '../document.service';
import {SelectionProcess} from '../../selection-process/selection-process';
import {environment} from '../../../environments/environment';
import {SelectionProcessService} from '../../selection-process/selection-process.service';
import {FileService} from '../file.service';

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
  private selectionProcessId: string;
  public selectionProcessEntity: SelectionProcess;
  public codes: any[] = DOC_TYPES;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private documentService: DocumentService,
              private selectionProcessService: SelectionProcessService,
              private fileService: FileService) { }

  ngOnInit(): void {
    this.selectionProcessId = this.route.snapshot.paramMap.get('id');

    this.selectionProcessService.get(this.selectionProcessId).subscribe(
      (selectionProcessEntity: SelectionProcess) => {
        this.selectionProcessEntity = selectionProcessEntity;
      }
    );

    const selectionProcess = new SelectionProcess();
    selectionProcess.uri = '/selectionProcess/' + this.selectionProcessId;
    this.documentService.findBySelectionProcess(selectionProcess,
      {size: this.pageSize, sort: this.sorting, params: [{key: 'page', value: this.page - 1}]}).subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.totalDocuments = this.documentService.totalElement();
      });
  }

  changePage(): void {
    this.documentService.page(this.page - 1).subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      });
  }

  onDownloadFile(fileId: number): void {
    this.fileService.downloadFile(fileId.toString());
  }

  onOpenFile(fileId: number, mime: string): void {
    this.fileService.openFile(fileId.toString()).subscribe(result => {
      console.log(result);
      const blob = new Blob([result], { type: mime});
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    });
  }

  onDocumentDelete(fileId: number): void {
    this.documentService.delete(this.documents.find(d => d.id === fileId)).subscribe(result => {
      this.ngOnInit();
    });
  }

}
