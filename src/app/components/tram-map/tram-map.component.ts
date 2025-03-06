import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as L from 'leaflet';
import { TRACK_COORDINATES } from '../../helper/constant';
import { LatLngTuple } from 'leaflet';

@Component({
  selector: 'app-tram-map',
  imports: [MatDialogModule, CommonModule],
  templateUrl: './tram-map.component.html',
  styleUrl: './tram-map.component.scss',
})
export class TramMapComponent {
  place = Math.random().toString();
  private map!: L.Map;
  dialogData = inject<typeof MAT_DIALOG_DATA>(MAT_DIALOG_DATA, {
    optional: true,
  });
  private tramMarker!: L.Marker;
  private trackCoordinates: LatLngTuple[] = TRACK_COORDINATES;

  ngAfterViewInit(): void {
    this.setMapItems();
  }

  setMapItems() {
    this.initializeMap();
    this.drawTrack();
    this.startMovingTram();
    this.addBanner([59.30330902697854, 18.095941499710477], 'Luma');
    this.addBanner([59.29315193932303, 18.063411889954896], 'Linde');
  }

  /**
   * Initializes the map with a default view centered around a specific location.
   */
  private initializeMap(): void {
    this.map = L.map(this.place).setView(
      [59.29915112261593, 18.081693702297752],
      14,
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      this.map,
    );
  }

  /**
   * Draws the tram route on the map using a polyline.
   * The route is displayed in orange with a weight of 10 pixels.
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
   * Animates the tram moving along the predefined route.
   * The tram moves from one coordinate to the next every 5 seconds.
   */
  private startMovingTram(): void {
    // Custom tram icon
    const tramIcon = L.icon({
      iconUrl: 'https://static.thenounproject.com/png/14231-200.png',
      iconSize: [32, 32],
    });

    // Initialize the tram marker at the starting point
    this.tramMarker = L.marker(this.trackCoordinates[0], {
      icon: tramIcon,
      zIndexOffset: 1000,
    }).addTo(this.map);

    let index = 0;

    // Function to move the tram along the track
    const moveTram = () => {
      if (index < this.trackCoordinates.length) {
        this.tramMarker.setLatLng(this.trackCoordinates[index]);
        index++;
        setTimeout(moveTram, 5000); // Move every 5 seconds
      }
    };

    moveTram();
  }

  /**
   * Adds a text-based banner (label) at the given coordinates.
   * Useful for marking tram stops or key locations.
   *
   * @param coords The latitude and longitude of the banner.
   * @param text The text to display on the banner.
   */
  private addBanner(coords: [number, number], text: string): void {
    const banner = L.divIcon({
      className: 'custom-banner',
      html: `<div class="banner">${text}</div>`,
      iconSize: [150, 50],
    });

    L.marker(coords, { icon: banner }).addTo(this.map);
  }
}
