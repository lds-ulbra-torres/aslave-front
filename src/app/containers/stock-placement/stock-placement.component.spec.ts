import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPlacementComponent } from './stock-placement.component';

describe('StockPlacementComponent', () => {
  let component: StockPlacementComponent;
  let fixture: ComponentFixture<StockPlacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPlacementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
