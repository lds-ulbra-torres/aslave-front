import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-placement',
  templateUrl: './stock-placement.component.html',
  styleUrls: ['./stock-placement.component.css']
})
export class StockPlacementComponent implements OnInit {

  displayStock: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  onDisplayStock(){
    this.displayStock = !this.displayStock;
  }
}
