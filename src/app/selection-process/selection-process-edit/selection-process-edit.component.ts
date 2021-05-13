import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionProcess } from '../selection-process';
import { SelectionProcessService } from '../selection-process.service';

@Component({
  selector: 'app-selection-process-edit',
  templateUrl: './selection-process-edit.component.html',
  styleUrls: []
})
export class SelectionProcessEditComponent implements OnInit {
  private selectionProcess: SelectionProcess;
  public id: string;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private selectionProcessService: SelectionProcessService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.selectionProcessService.get(this.id).subscribe((selectionProcess: SelectionProcess) => {
      this.selectionProcess = selectionProcess;
    });
  }

  onSubmit(): void {
    this.selectionProcessService.update(this.selectionProcess).subscribe(
      (newSelectionProcess: SelectionProcess) => {
        this.router.navigate(['/selectionProcesses/' + this.id]);
      }
    );
  }

}
