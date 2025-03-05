import { Component } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { first } from 'rxjs';
import { Departure } from '../../types/departures.types';
import { CommonModule } from '@angular/common';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer.component';

@Component({
  selector: 'app-tram-schedule',
  imports: [CommonModule, CountdownTimerComponent],
  templateUrl: './tram-schedule.component.html',
  styleUrl: './tram-schedule.component.scss',
})
export class TramScheduleComponent {
  tramsToLinde: Departure[] = [];
  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.getDepartures();
  }

  /**
   * Get All Departures
   */
  getDepartures() {
    this.scheduleService
      .getDepartures()
      .pipe(first())
      .subscribe((res) => {
        this.tramsToLinde = this.filterDepartures(res.departures);
      });
  }

  /**
   * Filter Departures based on
   * @param departures
   */
  filterDepartures(departures: Departure[]) {
    return departures.filter(
      (departure) =>
        departure.stop_area.name === 'Luma' &&
        departure.line.transport_mode === 'TRAM' &&
        departure.direction_code === 1,
    );
  }

  trackByTram(index: number, tram: any): number {
    return tram.journey.id; // Using a unique ID to track changes
  }
}
