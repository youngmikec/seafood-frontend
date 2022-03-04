import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelManagerComponent } from './parcel-manager.component';

describe('ParcelManagerComponent', () => {
  let component: ParcelManagerComponent;
  let fixture: ComponentFixture<ParcelManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
