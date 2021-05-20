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

  public getBeginDate(): string {
    return this.beginDate.toLocaleString();
  }

  public getEndDate(): string {
    return this.endDate.toLocaleString();
  }

}
