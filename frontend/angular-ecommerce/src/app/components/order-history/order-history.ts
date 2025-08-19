import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../../services/orderhistory.service';
import { OrderHistory2 } from '../../common/order-history';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule],
  templateUrl: './order-history.html',
  styleUrl: './order-history.scss'
})
export class OrderHistory implements OnInit{
  orderHistoryList: OrderHistory2[] = [];
  storage: Storage = sessionStorage;

  constructor(private orderHistoryService: OrderHistoryService) { }
  ngOnInit(): void {
    this.handLeOrderHistory();
  }

  handLeOrderHistory() {
    // read the user's email address from browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail')!);

    // retrieve data from the service
    this.orderHistoryService.getOrderHistory (theEmail).subscribe(
      data => {
        this.orderHistoryList = data._embedded.orders;
      }
    );
  }

}
