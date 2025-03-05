import { Component } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { first } from 'rxjs';
import { Departure } from '../../types/departures.types';
import { CommonModule } from '@angular/common';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer.component';
import { TramMapComponent } from '../tram-map/tram-map.component';
@Component({
  selector: 'app-tram-schedule',
  imports: [CommonModule, CountdownTimerComponent, TramMapComponent],
  templateUrl: './tram-schedule.component.html',
  styleUrl: './tram-schedule.component.scss',
})
export class TramScheduleComponent {
  tramsToLinde: Departure[] = [];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.getDepartures();
  }

  getDepartures() {
    this.scheduleService
      .getDepartures()
      .pipe(first())
      .subscribe((res) => {
        this.tramsToLinde = this.filterDepartures(res.departures);
      });
  }

  filterDepartures(departures: Departure[]) {
    return departures.filter(
      (departure) =>
        departure.stop_area.name === 'Luma' &&
        departure.line.transport_mode === 'TRAM' &&
        departure.direction_code === 1,
    );
  }

  trackByTram(index: number, tram: any): number {
    return tram.journey.id;
  }
}
