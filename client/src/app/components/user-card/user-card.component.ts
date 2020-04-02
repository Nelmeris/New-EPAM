import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {ActivatedRoute} from "@angular/router";
import {DataBaseService} from "../../services/data-base.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
