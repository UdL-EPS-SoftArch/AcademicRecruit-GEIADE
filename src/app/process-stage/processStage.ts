import { Resource } from '@lagoshny/ngx-hal-client';
import {User} from '../login-basic/user';
import {SelectionProcess} from '../selection-process/selection-process';

export class ProcessStage extends Resource {
  id: number;
  name: string;
  step: number;
  beginDate: Date;
  endDate: Date;
  selectionProcess: SelectionProcess;

  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

}
