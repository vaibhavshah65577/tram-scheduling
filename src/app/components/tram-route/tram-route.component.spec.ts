import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramRouteComponent } from './tram-route.component';

describe('TramRouteComponent', () => {
  let component: TramRouteComponent;
  let fixture: ComponentFixture<TramRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
