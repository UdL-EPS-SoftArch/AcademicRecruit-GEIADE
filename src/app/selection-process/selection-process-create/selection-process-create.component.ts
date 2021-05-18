import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SelectionProcessService } from '../selection-process.service';
import { SelectionProcess } from '../selection-process';
import { Location } from '@angular/common';

@Component({
  selector: 'app-selection-process-create',
  templateUrl: './selection-process-create.component.html',
  styleUrls: []
})
export class SelectionProcessCreateComponent implements OnInit {
  public selectionProcess: SelectionProcess;

  constructor(private router: Router,
              private location: Location,
              private selectionProcessService: SelectionProcessService) {
}

  ngOnInit(): void {
    this.selectionProcess = new SelectionProcess();
  }

  onSubmit(): void {
    this.selectionProcessService.create(this.selectionProcess).subscribe(
      (newSelectionProcess: SelectionProcess) => {
        // TODO: Navigate to selectionProcess detail when route defined
        this.router.navigate(['/about/']);
      }
    );
  }

  onCancel(): void {
    this.location.back();
  }

}
