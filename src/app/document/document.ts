import { Resource } from '@lagoshny/ngx-hal-client';
import {User} from '../login-basic/user';
import {SelectionProcess} from '../selection-process/selection-process';

export class Document extends Resource {
  id: number;
  title: string;
  docType: string;
  path: string;
  length: number;
  mime: string;

  // candidate: Candidate;
  selectionProcess: SelectionProcess;
  user: User;

  uri: string;

  getDocTypeLabel(): string {
    return DOC_TYPES.find(d => d.name === this.docType).value;
  }

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}

export const DOC_TYPES: any[] = [
  { id: 0, value: 'Resolució', name: 'RESOLUCIO' },
  { id: 1, value: 'Criteris d\'Avaluació', name: 'CRITERIS_AVALUACIO' },
  { id: 2, value: 'Altres', name: 'ALTRES' },
];
