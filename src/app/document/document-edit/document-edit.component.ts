import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {DOC_TYPES, Document} from '../document';
import {Sort} from '@lagoshny/ngx-hal-client';
import {DocumentService} from '../document.service';
import {SelectionProcess} from '../../selection-process/selection-process';
import {environment} from '../../../environments/environment';
import {SelectionProcessService} from '../../selection-process/selection-process.service';
import {FileService} from '../file.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  @ViewChild('dialogRef') dialogRef: TemplateRef<any>;

  private selectionProcessId: string;
  private documentId: string;
  public selectionProcessEntity: SelectionProcess;
  public documentEntity: Document;

  public codes: any[] = DOC_TYPES;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private documentService: DocumentService,
              private selectionProcessService: SelectionProcessService,
              private fileService: FileService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.selectionProcessId = this.route.snapshot.paramMap.get('id');
    this.documentId = this.route.snapshot.paramMap.get('docid');

    this.documentService.get(this.documentId).subscribe(
      (documentEntity: Document) => {
        this.documentEntity = documentEntity;
        this.selectionProcessService.getSelectionProcessFromDocument(this.documentEntity).subscribe(
          (selectionProcessEntity: SelectionProcess) => {
            if (selectionProcessEntity.id.toString() !== this.selectionProcessId) {
              this.location.back();
            }
          });
      }, error1 => {
        this.location.back();
      }
    );

    this.selectionProcessService.get(this.selectionProcessId).subscribe(
      (selectionProcessEntity: SelectionProcess) => {
        this.selectionProcessEntity = selectionProcessEntity;
      }, error1 => {
        this.location.back();
      }
    );
  }

  onSubmit(): void {
    this.documentService.update(this.documentEntity).subscribe(
      (newDocument: Document) => {
        this.router.navigate(['selectionProcesses/' + this.selectionProcessId + '/documents']);
      });
  }

  onCancel(): void {
    this.location.back();
  }

  saveCode(e): void {
    const name = e.target.value;
    const list = this.codes.find(x => x.value === name);
    this.documentEntity.docType = list.name;
  }

  onOpenFile(fileId: number): void {
    this.fileService.openFile(fileId.toString());
  }

  handleFileInput(files: FileList): void {
    const dialogRef = this.dialog.open(this.dialogRef, { disableClose: true });


    this.fileService.uploadFile(files.item(0), this.documentId).subscribe(
      (a: any) => {
        console.log('file uploaded');
        dialogRef.close();

        this.ngOnInit();
        // this.router.navigate([this.location.path()]);
      }
    );
  }
}
