import { Resource } from '@lagoshny/ngx-hal-client';
import {SelectionProcess} from '../selection-process/selection-process';

export class Candidate extends Resource {
  id: number;
  name: string;

  selectionProcess: SelectionProcess;

  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
