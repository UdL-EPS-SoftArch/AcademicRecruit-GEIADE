import { Injectable, Injector } from '@angular/core';
import {HalOptions, RestService} from '@lagoshny/ngx-hal-client';
import {ProcessStage} from './processStage';
import { Observable } from 'rxjs/internal/Observable';
import {SelectionProcess} from '../selection-process/selection-process';

@Injectable({
  providedIn: 'root'
})
export class ProcessStageService extends RestService<ProcessStage>{
  constructor(injector: Injector) {
    super(ProcessStage, 'processStages', injector);
  }


  public findBySelectionProcess(selectionProcess: SelectionProcess, options: any): Observable<ProcessStage[]> {
    options.params.push({key: 'selectionProcess', value: selectionProcess.uri});
    return this.search('findBySelectionProcess', options);
  }


}
