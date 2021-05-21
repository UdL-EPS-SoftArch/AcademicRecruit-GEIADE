import { Injectable, Injector } from '@angular/core';
import { RestService } from '@lagoshny/ngx-hal-client';
import { SelectionProcess } from './selection-process';
import {Document} from '../document/document';
import {Observable} from 'rxjs/internal/Observable';
import {Candidate} from '../candidate/candidate';
import {ProcessStage} from '../process-stage/processStage';

@Injectable()
export class SelectionProcessService extends RestService<SelectionProcess> {

  constructor(injector: Injector) {
    super(SelectionProcess, 'selectionProcesses', injector);
  }

  public getSelectionProcessFromDocument(document: Document): Observable<SelectionProcess> {
    return this.getByRelation(document._links.selectionProcess.href);
  }

  public getSelectionProcessFromCandidate(candidate: Candidate): Observable<SelectionProcess> {
    return this.getByRelation(candidate._links.selectionProcess.href);
  }
  public getSelectionProcessFromProcessStage(processStage: ProcessStage): Observable<SelectionProcess> {
    return this.getByRelation(processStage._links.selectionProcess.href);
  }
}
