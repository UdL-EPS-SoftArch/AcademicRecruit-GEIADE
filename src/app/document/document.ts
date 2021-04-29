import { Resource } from '@lagoshny/ngx-hal-client';
import {User} from '../login-basic/user';

export class Document extends Resource {
  id: number;
  title: string;
  docType: string;
  path: string;
  length: number;
  mime: string;

  // candidate: Candidate;
  // selectionProcess: SelectionProcess;
  user: User;

  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
