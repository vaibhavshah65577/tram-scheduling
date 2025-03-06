import { Component } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { first } from 'rxjs';
import { Departure } from '../../types/departures.types';
import { CommonModule } from '@angular/common';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer.component';
import { TramMapComponent } from '../tram-map/tram-map.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TramRouteComponent } from '../tram-route/tram-route.component';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component to display tram schedule for departures from Luma to Linde.
 * It fetches the departure data, filters relevant trams, and provides
 * an option to view the tram route in a dialog.
 */
@Component({
  selector: 'app-tram-schedule',
  imports: [
    CommonModule,
    CountdownTimerComponent,
    TramMapComponent,
    MatButtonModule,
  ],
  templateUrl: './tram-schedule.component.html',
  styleUrl: './tram-schedule.component.scss',
})
export class TramScheduleComponent {
  tramsToLinde: Departure[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private matDialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getDepartures();
  }

  /**
   * Fetches tram departures from the schedule service and filters relevant trams.
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
   * Filters tram departures to include only trams traveling from Luma to Linde.
   *
   * @param departures - List of all departures.
   * @returns Filtered list of departures matching the required criteria.
   */
  filterDepartures(departures: Departure[]): Departure[] {
    return departures.filter(
      (departure) =>
        departure.stop_area.name === 'Luma' &&
        departure.line.transport_mode === 'TRAM' &&
        departure.direction_code === 1,
    );
  }

  /**
   * Optimized trackBy function for ngFor to improve rendering performance.
   *
   * @param index - The index of the item.
   * @param tram - The tram departure object.
   * @returns Unique identifier for the tram journey.
   */
  trackByTram(index: number, tram: Departure): number {
    return tram.journey.id;
  }

  /**
   * Opens a dialog to display the tram route.
   *
   * @param tramData - The selected tram's departure data.
   */
  openDialog(tramData: Departure) {
    this.matDialog.open(TramRouteComponent, {
      panelClass: 'custom-dialog',
      data: {
        place: 'Detail Page',
        tramData,
      },
    });
  }
}
