import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { StockRemovalService } from './stock-removal.service';

@Component({
  selector: 'app-stock-removal',
  templateUrl: './stock-removal.component.html',
  styleUrls: ['./stock-removal.component.css']
})
export class StockRemovalComponent implements OnInit {

  stockOut: any[];

  displayRemoval: boolean = true;
  constructor(private stockRemovalService: StockRemovalService) { }

  ngOnInit() {
    this.stockRemovalService.getRemoval().pipe(first())
    .subscribe(stockOut =>{ this.stockOut = [... stockOut.body.obj] });
  }
  onDisplayRemoval(){
    this.displayRemoval = !this.displayRemoval;
  }

}
