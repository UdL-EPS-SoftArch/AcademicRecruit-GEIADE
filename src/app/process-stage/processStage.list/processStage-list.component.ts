import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProcessStage} from '../processStage';
import {Sort} from '@lagoshny/ngx-hal-client';
import {ProcessStageService} from '../processStage.service';
import {SelectionProcess} from '../../selection-process/selection-process';
import {environment} from '../../../environments/environment';
import {SelectionProcessService} from '../../selection-process/selection-process.service';

@Component({
  selector: 'app-process-stage-list',
  templateUrl: './processStage-list.component.html',
  styleUrls: ['./processStage-list.component.css']
})
export class ProcessStageListComponent implements OnInit {

  public processStages: ProcessStage[] = [];
  public pageSize = 6;
  public page = 1;
  public totalProcessStages = 0;
  private sorting: Sort[] = [{ path: 'id', order: 'ASC' }];
  private selectionProcessId: string;
  public selectionProcessEntity: SelectionProcess;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private processStageService: ProcessStageService,
              private selectionProcessService: SelectionProcessService) { }

  ngOnInit(): void {
    this.selectionProcessId = this.route.snapshot.paramMap.get('id');

    this.selectionProcessService.get(this.selectionProcessId).subscribe(
      (selectionProcessEntity: SelectionProcess) => {
        this.selectionProcessEntity = selectionProcessEntity;
      }
    );

    const selectionProcess = new SelectionProcess();
    selectionProcess.uri = '/selectionProcess/' + this.selectionProcessId;
    this.processStageService.findBySelectionProcess(selectionProcess,
      {size: this.pageSize, sort: this.sorting, params: [{key: 'page', value: this.page - 1}]}).subscribe(
      (processStage: ProcessStage[]) => {
        this.processStages = processStage;
        this.totalProcessStages = this.processStageService.totalElement();
      });
  }

  changePage(): void {
    this.processStageService.page(this.page - 1).subscribe(
      (processStage: ProcessStage[]) => {
        this.processStages = processStage;
      });
  }

  onProcessStageDelete(fileId: number): void {
    this.processStageService.delete(this.processStages.find(d => d.id === fileId)).subscribe(result => {
      this.ngOnInit();
    });
  }

}
