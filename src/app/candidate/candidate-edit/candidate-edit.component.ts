import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {SelectionProcess} from '../../selection-process/selection-process';
import {SelectionProcessService} from '../../selection-process/selection-process.service';

import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ErrorMessageService} from '../../error-handler/error-message.service';
import {HttpEventType} from '@angular/common/http';
import {Candidate} from '../candidate';
import {CandidateService} from '../candidate.service';

@Component({
  selector: 'app-candidate-edit',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.css']
})
export class CandidateEditComponent implements OnInit {

  @ViewChild('dialogRef') dialogRef: TemplateRef<any>;

  private candidateId: string;
  public selectionProcessEntity: SelectionProcess;
  public candidateEntity: Candidate;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private candidateService: CandidateService,
              private selectionProcessService: SelectionProcessService) { }

  ngOnInit(): void {
    this.candidateId = this.route.snapshot.paramMap.get('id');

    this.candidateService.get(this.candidateId).subscribe(
      (candidateEntity: Candidate) => {
        this.candidateEntity = candidateEntity;
        this.selectionProcessService.getSelectionProcessFromCandidate(this.candidateEntity).subscribe(
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
    this.candidateService.update(this.candidateEntity).subscribe(
      (newCandidate: Candidate) => {
        this.router.navigate(['selectionProcesses/', this.selectionProcessEntity.id]);
      });
  }

  onCancel(): void {
    this.location.back();
  }
}
