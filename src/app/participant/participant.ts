import { Resource } from '@lagoshny/ngx-hal-client';
import {User} from "../login-basic/user";
import {SelectionProcess} from "../selection-process/selection-process";


export class Participant extends Resource {
    id: string; //int
    role: string; //one of three roles.
    selectionProcess: SelectionProcess;
    user: User;

    constructor(values: object = {}) {
        super();
        Object.assign(this as any, values)
    }
}
