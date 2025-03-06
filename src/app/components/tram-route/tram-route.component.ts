import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as L from 'leaflet';
import { Departure } from '../../types/departures.types';
import { LatLngTuple } from 'leaflet';
import { TRACK_COORDINATES } from '../../helper/constant';

/**
 * Interface for dialog data containing tram details
 */
export interface DialogData {
  tramData: Departure;
}

@Component({
  selector: 'app-tram-route',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './tram-route.component.html',
  styleUrl: './tram-route.component.scss',
})
export class TramRouteComponent {
  private map!: L.Map;
  private tramMarker!: L.Marker;
  dialogData = inject<DialogData>(MAT_DIALOG_DATA, { optional: true });

  // Predefined tram route coordinates
  private trackCoordinates: LatLngTuple[] = TRACK_COORDINATES;
  private readonly numPoints = 70;
  private interpolatedCoordinates: LatLngTuple[] = this.interpolateRoute(
    this.trackCoordinates,
    this.numPoints,
  );

  ngAfterViewInit(): void {
    this.initializeMap();
    this.drawTrack();
    this.startMovingTram();
  }

  /**
   * Initializes the Leaflet map centered on the current tram location.
   */
  private initializeMap(): void {
    this.map = L.map('tram-map').setView(this.getCurrentLatLong(), 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      this.map,
    );
  }

  /**
   * Draws the tram route as a polyline with markers at key points.
   */
  private drawTrack(): void {
    L.polyline(this.trackCoordinates, { color: 'orange', weight: 5 })
      .addTo(this.map)
      .bindPopup('Tram Route Luma → Linde');

    this.trackCoordinates.forEach((coord) => {
      L.circleMarker(coord, {
        radius: 4,
        color: 'black',
        fillColor: 'white',
        fillOpacity: 1,
        weight: 2,
      }).addTo(this.map);
    });
  }

  /**
   * Moves the tram along the predefined route with a set interval.
   */
  private startMovingTram(): void {
    const tramIcon = L.icon({
      iconUrl: 'https://static.thenounproject.com/png/14231-200.png',
      iconSize: [32, 32],
    });

    this.tramMarker = L.marker(this.getCurrentLatLong(), {
      icon: tramIcon,
      zIndexOffset: 1000,
    }).addTo(this.map);

    let index = this.dialogData
      ? 72 - Math.floor(this.dialogData.tramData.countdown / 10)
      : 0;

    const moveTram = () => {
      if (index < this.interpolatedCoordinates.length) {
        this.tramMarker.setLatLng(this.interpolatedCoordinates[index]);
        index++;
        setTimeout(moveTram, 5000);
      }
    };
    moveTram();
  }

  /**
   * Gets the current tram position based on countdown timer.
   */
  private getCurrentLatLong(): LatLngTuple {
    const positionIndex = this.dialogData
      ? 72 - Math.floor(this.dialogData.tramData.countdown / 10)
      : 0;
    return (
      this.interpolatedCoordinates[positionIndex - 1] ||
      this.interpolatedCoordinates[0]
    );
  }

  /**
   * Generates intermediate points along the tram route using linear interpolation.
   */
  private interpolateRoute(
    points: LatLngTuple[],
    numPoints: number,
  ): LatLngTuple[] {
    const pointTillLuma = points.slice(0, 4);
    const generatedCoords: LatLngTuple[] = [];

    for (let i = 0; i < pointTillLuma.length - 1; i++) {
      const [lat1, lon1] = pointTillLuma[i];
      const [lat2, lon2] = pointTillLuma[i + 1];
      const segmentPoints = numPoints / (pointTillLuma.length - 1);

      for (let j = 0; j < segmentPoints; j++) {
        const t = j / segmentPoints;
        generatedCoords.push([
          lat1 + t * (lat2 - lat1),
          lon1 + t * (lon2 - lon1),
        ]);
      }
    }
    generatedCoords.push(pointTillLuma[pointTillLuma.length - 1]);
    return generatedCoords;
  }
}
