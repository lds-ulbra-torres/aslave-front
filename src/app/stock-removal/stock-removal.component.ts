import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-removal',
  templateUrl: './stock-removal.component.html',
  styleUrls: ['./stock-removal.component.css']
})
export class StockRemovalComponent implements OnInit {

  displayRemoval: boolean = true;
  constructor() { }

  ngOnInit() {
  }
  onDisplayRemoval(){
    this.displayRemoval = !this.displayRemoval;
  }

}
