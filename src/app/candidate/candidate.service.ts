import { Injectable, Injector } from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Candidate} from './candidate';
import {SelectionProcess} from '../selection-process/selection-process';
import {Observable} from 'rxjs/internal/Observable';
import {Document} from '../document/document';

@Injectable({
  providedIn: 'root'
})
export class CandidateService extends RestService<Candidate>{
  constructor(injector: Injector) {
    super(Candidate, 'candidates', injector);
  }


  public findBySelectionProcess(selectionProcess: SelectionProcess, options: any): Observable<Candidate[]> {
    options.params.push({key: 'selectionProcess', value: selectionProcess.uri});
    return this.search('findBySelectionProcess', options);
  }

  public findBySelectionProcessAndNameContaining(selectionProcess: SelectionProcess, name: string): Observable<Candidate[]> {
    const options: any = {params: []};
    console.log(selectionProcess);
    options.params.push({key: 'selectionProcess', value: selectionProcess.uri});
    options.params.push({key: 'text', value: name});

    return this.search('findBySelectionProcessAndNameContaining', options);
  }

  public getCandidateFromDocument(document: Document): Observable<Candidate> {
    return this.getByRelation(document._links.candidate.href);
  }
}
