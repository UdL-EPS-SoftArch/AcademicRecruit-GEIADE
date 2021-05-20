import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import {Candidate} from '../candidate';
import {CandidateService} from '../candidate.service';
import {SelectionProcess} from '../../selection-process/selection-process';
import {SelectionProcessService} from '../../selection-process/selection-process.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-candidate-search',
  templateUrl: './candidate-search.component.html'
})

export class CandidateSearchComponent implements OnInit{
  @Output() emitResults: EventEmitter<Candidate> = new EventEmitter();
  searchFailed = false;
  searching = false;

  private selectionProcessId: string;
  public selectionProcessEntity: SelectionProcess;

  constructor(private route: ActivatedRoute,
              private candidateService: CandidateService) {
  }

  ngOnInit(): void {
    this.selectionProcessId = this.route.snapshot.paramMap.get('id');

    this.selectionProcessEntity = new SelectionProcess();
    this.selectionProcessEntity.uri = '/selectionProcess/' + this.selectionProcessId;
  }

  search(): (text$: Observable<string>) => Observable<Candidate[]> {
    return (text$: Observable<string>) => text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => term.length < 1 ? of([]) :
        this.candidateService.findBySelectionProcessAndNameContaining(this.selectionProcessEntity, term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    );
  }

  select(item: any): void {
    this.emitResults.emit(item as Candidate);
  }
}
