import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min.js'
import { OrderGraphQLService } from 'src/app/services/graph-ql/order-graph-ql.service.js';
import { Order } from 'src/app/models/order/order.js';
import { OrderType } from 'src/app/models/order/order-type.js';
import { OrderTypeGraphQLService } from 'src/app/services/graph-ql/order-type-graph-ql.service.js';
import { OrderStatus } from 'src/app/models/order/order-status.js';
import { OrderStatusGraphQLService } from 'src/app/services/graph-ql/order-status-graph-ql.service.js';
import { User } from 'src/app/models/user/user.js';
import { UserGraphQLService } from 'src/app/services/graph-ql/user-graph-ql.service.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private orders: Order[] = []
  private orderTypes: OrderType[] = []
  private orderStatuses: OrderStatus[] = []
  private users: User[] = []

  constructor(
    private orderGraphQLService: OrderGraphQLService,
    private orderTypeGraphQLService: OrderTypeGraphQLService,
    private orderStatusGraphQLService: OrderStatusGraphQLService,
    private userGraphQLService: UserGraphQLService
  ) { }

  ngOnInit(): void {
    (async () => {
      await this.loadData()
      this.constructOrderTypeChart()
      this.constructOrderStatusChart()
      this.constructUsersChart()
    })()
  }

  private async loadData() {
    this.orders = await this.orderGraphQLService.getCollection()
    this.orderTypes = await this.orderTypeGraphQLService.getCollection()
    this.orderStatuses = await this.orderStatusGraphQLService.getCollection()
    this.users = await this.userGraphQLService.getUsers()
  }

  private constructOrderTypeChart() {
    let dataPoints = []

    this.orderTypes.forEach(type => {
      let count = 0
      this.orders.forEach(order => {
        if (order.typeId === type.id)
          count++
      })
      dataPoints.push({
        y: count,
        name: type.title
      })
    })

    let chart = new CanvasJS.Chart("orderTypeStats", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Статистика типов заказов"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: dataPoints
      }]
    });
      
    chart.render();
  }

  private constructOrderStatusChart() {
    let dataPoints = []

    this.orderStatuses.forEach(status => {
      let count = 0
      this.orders.forEach(order => {
        if (order.statusId === status.id)
          count++
      })
      dataPoints.push({
        y: count,
        name: status.title
      })
    })

    let chart = new CanvasJS.Chart("orderStatusStats", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Статистика статусов заказов"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: dataPoints
      }]
    });
      
    chart.render();
  }

  private constructUsersChart() {
    let dataPoints = [];

    const dateNow = new Date();
    const users = this.users
    .filter(user => user.createdAt.getFullYear() === dateNow.getFullYear())
    .sort((a, b) => +a.createdAt - +b.createdAt)

    for (var i = 1; i <= 12; i++) {
      const monthUsers = users.filter(user => user.createdAt.getMonth() === i)
      dataPoints.push({
        x: new Date(dateNow.getFullYear(), i, 1),
        y: monthUsers.length
      })
    }

    console.log(dataPoints)

    var chart = new CanvasJS.Chart("userCreateDatePoints", {
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      animationEnabled: true,
      title:{
        text: "Созданные пользователи - " + dateNow.getFullYear()  
      },
      axisX: {
        interval: 1,
        intervalType: "month",
        valueFormatString: "MMM"
      },
      data: [{        
        type: "line",
        xValueFormatString: "MMM, YYYY",
        dataPoints: dataPoints
      }]
    });
    chart.render();
  }

}
