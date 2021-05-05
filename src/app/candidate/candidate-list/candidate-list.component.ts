import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Document} from '../canidate';
import {Sort} from '@lagoshny/ngx-hal-client';
import {DocumentService} from '../candidate.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  public candidates: Candidate[] = [];
  public pageSize = 6;
  public page = 1;
  public totalDocuments = 0;
  private sorting: Sort[] = [{ path: 'id', order: 'ASC' }];

  constructor(private router: Router,
              private location: Location,
              private candidates: CandidateService) { }

  ngOnInit(): void {
    this.candidateService.getAll({size: this.pageSize, sort: this.sorting, params: [{key: 'page', value: 0}]}).subscribe(
      (documents: Document[]) => {
        this.candidates = documents;
        this.totalCandidates = this.candidatesService.totalElement();
      });
  }

  changePage(): void {
    this.candidatesService.page(this.page - 1).subscribe(
      (candidates: Candidate[]) => {
        this.candidates = candidates;
      });
  }

}