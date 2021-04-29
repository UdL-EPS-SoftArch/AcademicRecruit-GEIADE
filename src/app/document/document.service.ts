import { Injectable, Injector } from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Document} from './document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends RestService<Document>{
  constructor(injector: Injector) {
    super(Document, 'documents', injector);
  }
}
