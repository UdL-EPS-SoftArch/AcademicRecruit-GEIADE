import { Component, OnInit } from '@angular/core';
import {SelectionProcessService} from '../selection-process.service';
import {SelectionProcess} from '../selection-process';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-selection-process-list',
  templateUrl: './selection-process-list.component.html',
  styleUrls: ['./selection-process-list.component.css']
})
export class SelectionProcessListComponent implements OnInit {
  public selectionprocesses: SelectionProcess[] = [];
  public pageSize = 5;
  public page = 1;
  public totalSelectionProcesses = 0;
  private sorting: Sort[] = [{ path: 'username', order: 'ASC' }];


  constructor(
    public router: Router,
    private selectionprocessService: SelectionProcessService){
  }


  ngOnInit(): void {
    this.selectionprocessService.getAll({sort: this.sorting}).subscribe(
      (selectionprocesses: SelectionProcess[]) => {
        this.selectionprocesses = selectionprocesses;
        this.totalSelectionProcesses = this.selectionprocessService.totalElement();
      }
    );
  }

  changePage(): void {
    this.selectionprocessService.page(this.page - 1).subscribe(
      (selectionprocesses: SelectionProcess[]) => this.selectionprocesses = selectionprocesses);
  }

  detail(selectionprocess: SelectionProcess): void {
    this.router.navigate(['selectionprocesses', selectionprocess.id]);
  }

}
