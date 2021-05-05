import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Candidate} from '../canidate';
import {Sort} from '@lagoshny/ngx-hal-client';
import {CandidateService} from '../candidate.service';

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

  constructor(private router: Router,
              private location: Location,
              private candidates: CandidateService) { }

  ngOnInit(): void {
    this.candidateService.getAll({size: this.pageSize, sort: this.sorting, params: [{key: 'page', value: 0}]}).subscribe(
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

}