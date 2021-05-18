import { Component, OnInit } from '@angular/core';
import {SelectionProcessService} from '../selection-process.service';
import {SelectionProcess} from '../selection-process';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-selection-process-list',
  templateUrl: './selection-process-list.component.html',
  styleUrls: []
})
export class SelectionProcessListComponent implements OnInit {
  public selectionProcesses: SelectionProcess[] = [];
  public pageSize = 5;
  public page = 1;
  public totalSelectionProcesses = 0;
  private sorting: Sort[] = [{ path: 'username', order: 'ASC' }];


  constructor(
    public router: Router,
    private selectionProcessService: SelectionProcessService){
  }


  ngOnInit(): void {
    this.selectionProcessService.getAll({sort: this.sorting}).subscribe(
      (selectionProcesses: SelectionProcess[]) => {
        this.selectionProcesses = selectionProcesses;
        this.totalSelectionProcesses = this.selectionProcessService.totalElement();
      }
    );
  }

  changePage(): void {
      this.selectionProcessService.page(this.page - 1).subscribe(
        (selectionProcesses: SelectionProcess[]) => this.selectionProcesses = selectionProcesses);
  }

  detail(selectionProcess: SelectionProcess): void {
    this.router.navigate(['selectionProcesses', selectionProcess.id]);
  }

}
