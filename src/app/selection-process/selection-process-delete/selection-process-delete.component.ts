import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionProcess } from '../selection-process';
import { SelectionProcessService } from '../selection-process.service';

@Component({
  selector: 'app-selection-process-delete',
  templateUrl: './selection-process-delete.component.html',
  styleUrls: []
})
export class SelectionProcessDeleteComponent implements OnInit {
  public selectionProcess: SelectionProcess = new SelectionProcess();
  private id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private selectionProcessService: SelectionProcessService
              ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.selectionProcessService.get(this.id).subscribe(
      selectionProcess => this.selectionProcess = selectionProcess);
  }

  delete(): void {
    this.selectionProcessService.delete(this.selectionProcess).subscribe(
      () => {
        this.router.navigate(['selectionProcesses'])
      });
  }

}
