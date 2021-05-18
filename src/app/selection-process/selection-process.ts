import { Resource } from '@lagoshny/ngx-hal-client';

export class SelectionProcess extends Resource {
  id: string;
  vacancy: string;
  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
