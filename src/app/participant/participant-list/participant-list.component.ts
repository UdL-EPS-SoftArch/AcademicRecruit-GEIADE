import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Participant} from '../participant';
import {ParticipantService} from '../participant.service';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})

export class ParticipantListComponent implements OnInit {

  public participants: Participant[] = [];
  public pageSize = 6;
  public page = 1;
  public totalParticipants = 0;
  private sorting: Sort[] = [{ path: 'id', order: 'ASC' }];

  constructor(private router: Router,
              private location: Location,
              private participantService: ParticipantService) { }

  ngOnInit(): void {
    this.participantService.getAll({size: this.pageSize, sort: this.sorting, params: [{key: 'page', value: 0}]}).subscribe(
      (participants: Participant[]) => {
        this.participants = participants;
        this.totalParticipants = this.participantService.totalElement();
      });
  }

  changePage(): void {
    this.participantService.page(this.page - 1).subscribe(
      (participants: Participant[]) => {
        this.participants = participants;
      });
  }

}
