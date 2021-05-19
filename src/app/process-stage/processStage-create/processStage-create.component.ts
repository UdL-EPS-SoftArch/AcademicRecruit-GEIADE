import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProcessStage} from '../processStage';
import {Sort} from '@lagoshny/ngx-hal-client';
import {ProcessStageService} from '../processStage.service';
import {SelectionProcess} from '../../selection-process/selection-process';
import {environment} from '../../../environments/environment';
import {SelectionProcessService} from '../../selection-process/selection-process.service';
import {User} from '../../login-basic/user';

@Component({
  selector: 'app-process-stage-create',
  templateUrl: './processStage-create.component.html',
  styleUrls: ['./processStage-create.component.css']
})
export class ProcessStageCreateComponent implements OnInit {

  public processStage: ProcessStage;
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
        this.processStage.selectionProcess = selectionProcessEntity;
      }
    );
    this.processStage = new ProcessStage();
  }

  onSubmit(): void {
    this.processStageService.create(this.processStage).subscribe(
      (newProcessStage: ProcessStage) => {
        this.router.navigate(['selectionProcesses/' + this.selectionProcessId + '/processStage']);
      });
  }

  onCancel(): void {
    this.location.back();
  }
}
