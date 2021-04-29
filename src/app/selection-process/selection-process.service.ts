import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestService } from '@lagoshny/ngx-hal-client';
import { SelectionProcess } from './selection-process';

@Injectable()
export class SelectionProcessService extends RestService<SelectionProcess> {

  constructor(injector: Injector) {
    super(SelectionProcess, 'selectionProcesses', injector);
  }
}
