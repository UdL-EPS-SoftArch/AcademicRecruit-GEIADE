import { Injectable, Injector } from '@angular/core';
import { RestService } from '@lagoshny/ngx-hal-client';
import { Participant } from './participant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService extends RestService<Participant> {
  constructor(injector: Injector) {
    super(Participant, 'participant', injector);
  }
}
