import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRemovalComponent } from './stock-removal.component';

describe('StockRemovalComponent', () => {
  let component: StockRemovalComponent;
  let fixture: ComponentFixture<StockRemovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockRemovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockRemovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
