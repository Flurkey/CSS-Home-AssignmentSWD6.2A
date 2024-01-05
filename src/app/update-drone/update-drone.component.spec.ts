import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDroneComponent } from './update-drone.component';

describe('UpdateDroneComponent', () => {
  let component: UpdateDroneComponent;
  let fixture: ComponentFixture<UpdateDroneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDroneComponent]
    });
    fixture = TestBed.createComponent(UpdateDroneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
