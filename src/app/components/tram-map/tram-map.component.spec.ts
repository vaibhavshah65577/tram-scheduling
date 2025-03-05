import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramMapComponent } from './tram-map.component';

describe('TramMapComponent', () => {
  let component: TramMapComponent;
  let fixture: ComponentFixture<TramMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
