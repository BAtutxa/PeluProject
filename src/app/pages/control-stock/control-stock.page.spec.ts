import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlStockPage } from './control-stock.page';

describe('ControlStockPage', () => {
  let component: ControlStockPage;
  let fixture: ComponentFixture<ControlStockPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
