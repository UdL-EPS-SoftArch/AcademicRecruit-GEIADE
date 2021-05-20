import { Injectable, Injector } from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Candidate} from './candidate';
import {SelectionProcess} from '../selection-process/selection-process';
import {Observable} from 'rxjs/internal/Observable';

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
}
