import { Resource } from '@lagoshny/ngx-hal-client';
import {User} from '../login-basic/user';
import {SelectionProcess} from '../selection-process/selection-process';


export class Participant extends Resource {
    id: string;
    role: string; // one of three roles.
    selectionProcess: SelectionProcess;
    user: User;

    constructor(values: object = {}) {
        super();
        Object.assign(this as any, values);
    }

    getRoleLabel(): string {
      return ROLE.find(d => d.name === this.role).value;
    }

}

export const ROLE: any[] = [
  { id: 0, value: 'President', name: 'PRESIDENT' },
  { id: 1, value: 'Secretary', name: 'SECRETARY' },
  { id: 2, value: 'Vocal', name: 'VOCAL' },
];
