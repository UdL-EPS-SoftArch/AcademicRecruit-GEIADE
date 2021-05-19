import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {DOC_TYPES, Document} from '../document';
import {Sort} from '@lagoshny/ngx-hal-client';
import {DocumentService} from '../document.service';
import {SelectionProcess} from '../../selection-process/selection-process';
import {environment} from '../../../environments/environment';
import {SelectionProcessService} from '../../selection-process/selection-process.service';
import {User} from '../../login-basic/user';

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.css']
})
export class DocumentCreateComponent implements OnInit {

  public document: Document;
  private selectionProcessId: string;
  public selectionProcessEntity: SelectionProcess;
  public codes: any[] = DOC_TYPES;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private documentService: DocumentService,
              private selectionProcessService: SelectionProcessService) { }

  ngOnInit(): void {
    this.selectionProcessId = this.route.snapshot.paramMap.get('id');
    this.selectionProcessService.get(this.selectionProcessId).subscribe(
      (selectionProcessEntity: SelectionProcess) => {
        this.selectionProcessEntity = selectionProcessEntity;
        this.document.selectionProcess = selectionProcessEntity;
      }
    );
    this.document = new Document();
    this.document.docType = this.codes[0].name;
  }

  onSubmit(): void {
    this.documentService.create(this.document).subscribe(
      (newDocument: Document) => {
        this.router.navigate(['selectionProcesses', this.selectionProcessId]);
      });
  }

  onCancel(): void {
    this.location.back();
  }

  saveCode(e): void {
    const name = e.target.value;
    const list = this.codes.find(x => x.value === name);
    this.document.docType = list.name;
  }
}
