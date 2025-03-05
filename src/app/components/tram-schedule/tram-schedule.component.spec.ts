import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramScheduleComponent } from './tram-schedule.component';

describe('TramScheduleComponent', () => {
  let component: TramScheduleComponent;
  let fixture: ComponentFixture<TramScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
