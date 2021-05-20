import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {SelectionProcess} from '../../selection-process/selection-process';
import {SelectionProcessService} from '../../selection-process/selection-process.service';
import {Candidate} from '../candidate';
import {CandidateService} from '../candidate.service';

@Component({
  selector: 'app-document-create',
  templateUrl: './candidate-create.component.html',
  styleUrls: ['./candidate-create.component.css']
})
export class CandidateCreateComponent implements OnInit {

  public candidate: Candidate;
  private selectionProcessId: string;
  public selectionProcessEntity: SelectionProcess;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private candidateService: CandidateService,
              private selectionProcessService: SelectionProcessService) { }

  ngOnInit(): void {
    this.selectionProcessId = this.route.snapshot.paramMap.get('id');
    this.selectionProcessService.get(this.selectionProcessId).subscribe(
      (selectionProcessEntity: SelectionProcess) => {
        this.selectionProcessEntity = selectionProcessEntity;
        this.candidate.selectionProcess = selectionProcessEntity;
      }
    );
    this.candidate = new Candidate();
  }

  onSubmit(): void {
    this.candidateService.create(this.candidate).subscribe(
      (newCandidate: Candidate) => {
        this.router.navigate(['selectionProcesses', this.selectionProcessId]);
      });
  }

  onCancel(): void {
    this.location.back();
  }
}
