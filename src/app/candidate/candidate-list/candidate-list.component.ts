import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Candidate} from '../candidate';
import {Sort} from '@lagoshny/ngx-hal-client';
import {CandidateService} from '../candidate.service';
import {SelectionProcess} from '../../selection-process/selection-process';
import {Document} from '../../document/document';
import {SelectionProcessService} from '../../selection-process/selection-process.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  public candidates: Candidate[] = [];
  public pageSize = 6;
  public page = 1;
  public totalCandidates = 0;
  private sorting: Sort[] = [{ path: 'id', order: 'ASC' }];
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
      }
    );

    const selectionProcess = new SelectionProcess();
    selectionProcess.uri = '/selectionProcess/' + this.selectionProcessId;
    this.candidateService.findBySelectionProcess(selectionProcess,
      {size: this.pageSize, sort: this.sorting, params: [{key: 'page', value: this.page - 1}]}).subscribe(
      (candidates: Candidate[]) => {
        this.candidates = candidates;
        this.totalCandidates = this.candidateService.totalElement();
      });
  }

  changePage(): void {
    this.candidateService.page(this.page - 1).subscribe(
      (candidates: Candidate[]) => {
        this.candidates = candidates;
      });
  }

  onCandidateDelete(fileId: number): void {
    this.candidateService.delete(this.candidates.find(d => d.id === fileId)).subscribe(result => {
      this.ngOnInit();
    });
  }

}
