import { Injectable, Injector } from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Candidate} from './canidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService extends RestService<Candidate>{
  constructor(injector: Injector) {
    super(Candidate, 'candidates', injector);
  }
}
