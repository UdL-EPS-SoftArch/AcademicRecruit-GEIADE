  
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionProcessService } from '../selection-process.service';
import { SelectionProcess } from '../selection-process';

@Component({
  selector: 'app-selection-process-detail',
  templateUrl: './selection-process-detail.component.html',
  styleUrls: []
})
export class SelectionProcessDetailComponent implements OnInit {
  public selectionProcess: SelectionProcess;
  private id: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private selectionProcessService: SelectionProcessService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.selectionProcessService.get(this.id).subscribe((selectionProcess: SelectionProcess) => {
      this.selectionProcess = selectionProcess;
      // TO-DO: Get all relations
    });
  }
}