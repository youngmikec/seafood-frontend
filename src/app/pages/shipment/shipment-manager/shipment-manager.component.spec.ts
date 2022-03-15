import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentManagerComponent } from './shipment-manager.component';

describe('ShipmentManagerComponent', () => {
  let component: ShipmentManagerComponent;
  let fixture: ComponentFixture<ShipmentManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
