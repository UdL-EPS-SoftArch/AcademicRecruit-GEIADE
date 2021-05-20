import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProcessStage} from '../processStage';
import {ProcessStageService} from '../processStage.service';
import {SelectionProcess} from '../../selection-process/selection-process';
import {SelectionProcessService} from '../../selection-process/selection-process.service';

import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ErrorMessageService} from '../../error-handler/error-message.service';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-process-stage-edit',
  templateUrl: './processStage-edit.component.html',
  styleUrls: ['./processStage-edit.component.css']
})
export class ProcessStageEditComponent implements OnInit {

  @ViewChild('dialogRef') dialogRef: TemplateRef<any>;

  private processStageId: string;
  public selectionProcessEntity: SelectionProcess;
  public processStageEntity: ProcessStage;
  public percentageUpload: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private processStageService: ProcessStageService,
              private selectionProcessService: SelectionProcessService,
              private modalService: NgbModal,
              private errorMessageService: ErrorMessageService) { }

  ngOnInit(): void {
    this.processStageId = this.route.snapshot.paramMap.get('id');

    this.processStageService.get(this.processStageId).subscribe(
      (processStageEntity: ProcessStage) => {
        this.processStageEntity = processStageEntity;
        this.selectionProcessService.getSelectionProcessFromProcessStage(this.processStageEntity).subscribe(
          (selectionProcessEntity: SelectionProcess) => {
                this.selectionProcessEntity = selectionProcessEntity;
          }, error1 => {
            this.location.back();
          });
      }, error1 => {
        this.location.back();
      }
    );
  }

  onSubmit(): void {
    this.processStageService.update(this.processStageEntity).subscribe(
      (newProcessStage: ProcessStage) => {
        this.router.navigate(['selectionProcesses/' + this.selectionProcessEntity.id + '/processStage']);
      });
  }

  onCancel(): void {
    this.location.back();
  }
}
