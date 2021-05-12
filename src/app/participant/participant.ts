import { Resource } from '@lagoshny/ngx-hal-client';

export class Participant extends Resource {
    id: string; //int
    role: string; //one of three roles.

    constructor(values: object = {}) {
        super();
        Object.assign(this as any, values)
    }
}
