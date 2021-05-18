import { Injectable, Injector } from '@angular/core';
import {Document} from './document';
import { Observable } from 'rxjs/internal/Observable';
import {User} from '../login-basic/user';
import {SelectionProcess} from '../selection-process/selection-process';
import {HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService{
  constructor(private httpClient: HttpClient) {
  }


  public uploadFile(file: File, fileId: string): Observable<any> {
    const endpoint = environment.API + '/files/' + fileId;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post(endpoint, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public deleteFile(fileId: string): Observable<any> {
    const endpoint = environment.API + '/files/' + fileId;
    return this.httpClient.delete(endpoint);
  }

  public downloadFile(fileId: string): void {
    window.open(environment.API + '/files/' + fileId, '_blank');
  }

  public openFile(fileId: string): Observable<any> {
    return this.httpClient.get(environment.API + '/files/' + fileId, { responseType: 'blob'});
  }
}
