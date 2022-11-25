import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositManagerComponent } from './deposit-manager.component';

describe('DepositManagerComponent', () => {
  let component: DepositManagerComponent;
  let fixture: ComponentFixture<DepositManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
