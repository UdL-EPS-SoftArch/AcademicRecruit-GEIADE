import { Injectable, Injector } from '@angular/core';
import {HalOptions, RestService} from '@lagoshny/ngx-hal-client';
import {Document} from './document';
import { Observable } from 'rxjs/internal/Observable';
import {User} from '../login-basic/user';
import {SelectionProcess} from '../selection-process/selection-process';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends RestService<Document>{
  constructor(injector: Injector) {
    super(Document, 'documents', injector);
  }


  public findBySelectionProcess(selectionProcess: SelectionProcess, options: any): Observable<Document[]> {
    options.params.push({key: 'selectionProcess', value: selectionProcess.uri});
    return this.search('findBySelectionProcess', options);
  }

}
