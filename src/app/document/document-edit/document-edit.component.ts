import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {DOC_TYPES, Document} from '../document';
import {DocumentService} from '../document.service';
import {SelectionProcess} from '../../selection-process/selection-process';
import {SelectionProcessService} from '../../selection-process/selection-process.service';
import {FileService} from '../file.service';

import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ErrorMessageService} from '../../error-handler/error-message.service';
import {HttpEventType} from '@angular/common/http';
import {Candidate} from '../../candidate/candidate';
import {CandidateService} from '../../candidate/candidate.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  @ViewChild('dialogRef') dialogRef: TemplateRef<any>;

  private documentId: string;
  public selectionProcessEntity: SelectionProcess;
  public candidateEntity: Candidate;
  public documentEntity: Document;
  public percentageUpload: number;

  public codes: any[] = DOC_TYPES;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private documentService: DocumentService,
              private selectionProcessService: SelectionProcessService,
              private fileService: FileService,
              private modalService: NgbModal,
              private candidateService: CandidateService,
              private errorMessageService: ErrorMessageService) { }

  ngOnInit(): void {
    this.documentId = this.route.snapshot.paramMap.get('id');

    this.documentService.get(this.documentId).subscribe(
      (documentEntity: Document) => {
        this.documentEntity = documentEntity;

        this.selectionProcessService.getSelectionProcessFromDocument(this.documentEntity).subscribe(
          (selectionProcessEntity: SelectionProcess) => {
                this.selectionProcessEntity = selectionProcessEntity;
          }, error1 => {
            this.location.back();
          });

        this.candidateService.getCandidateFromDocument(this.documentEntity).subscribe(
          (candidateEntity: Candidate) => {
            this.candidateEntity = candidateEntity;
            console.log(this.candidateEntity);
          });
      }, error1 => {
        this.location.back();
      }
    );
  }

  onSubmit(): void {
    this.documentService.update(this.documentEntity).subscribe(
      (newDocument: Document) => {
        this.router.navigate(['selectionProcesses/', this.selectionProcessEntity.id]);
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

  onDownloadFile(fileId: number): void {
    this.fileService.downloadFile(fileId.toString());
  }

  onOpenFile(fileId: number): void {
    this.fileService.openFile(fileId.toString()).subscribe(result => {
      console.log(result);
      const blob = new Blob([result], { type: this.documentEntity.mime});
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    });
  }

  onDeleteFile(fileId: number): void {
    this.fileService.deleteFile(fileId.toString()).subscribe(next => {
      this.ngOnInit();
    });
  }

  handleFileInput(files: FileList): void {
    if (files === null || files === undefined || files.length === 0) {
      return;
    }

    const modalOpened: NgbModalRef = this.modalService.open(this.dialogRef, {backdrop: 'static', keyboard: false});
    modalOpened.result.then((result) => {
      console.log('Closed with result ' + result);
    }, (reason) => {
      console.log('Dismissed ' + reason);
    });

    this.fileService.uploadFile(files.item(0), this.documentId).subscribe(
      resp => {

        if (resp.type === HttpEventType.Response) {
          console.log('Upload complete');
          modalOpened.close();
          this.ngOnInit();
        }

        if (resp.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * resp.loaded / resp.total);
          console.log('Progress ' + percentDone + '%');
          this.percentageUpload = percentDone;
        }
      }, error => {
        console.log(error);
        this.errorMessageService.showErrorMessage('File couldn\'t be uploaded. Max file size is 8192KB!');
        modalOpened.close();
      }
    );
  }
}
