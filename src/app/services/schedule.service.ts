import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartureResponse } from '../types/departures.types';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private getTrainsList = 'data/departures.json';

  constructor(private http: HttpClient) {}

  /**
   * Get all departures list
   */
  getDepartures(): Observable<DepartureResponse> {
    return this.http.get<DepartureResponse>(this.getTrainsList);
  }
}
