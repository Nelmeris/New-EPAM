import { Component } from '@angular/core';
import {DataBaseService} from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NEW-EPAM';

  users = [];
  userTypes = [];

  constructor(private dataBaseService: DataBaseService) {
    this.getData();
  }

  async getData() {
    this.users = await this.dataBaseService.getUsers();
    this.userTypes = await this.dataBaseService.getUserTypes();
    this.orderStatuses = await this.dataBaseService.getOrderStatuses();
  }
}
