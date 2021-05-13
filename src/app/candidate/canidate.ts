import { Resource } from '@lagoshny/ngx-hal-client';
import {User} from '../login-basic/user';

export class Candidate extends Resource {
  name: string;
  dni: string;
  

  candidate: Candidate;
  // selectionProcess: SelectionProcess;
  user: User;

  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}