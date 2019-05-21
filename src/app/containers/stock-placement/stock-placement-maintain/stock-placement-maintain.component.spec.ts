import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPlacementMaintainComponent } from './stock-placement-maintain.component';

describe('StockPlacementMaintainComponent', () => {
  let component: StockPlacementMaintainComponent;
  let fixture: ComponentFixture<StockPlacementMaintainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPlacementMaintainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPlacementMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
