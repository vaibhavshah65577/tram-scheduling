import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-tram-map',
  imports: [],
  templateUrl: './tram-map.component.html',
  styleUrl: './tram-map.component.scss',
})
export class TramMapComponent {
  private map!: L.Map;
  private tramMarker!: L.Marker;
  private trackCoordinates: L.LatLngExpression[] = [
    [59.30655125485032, 18.115424876914542],
    [59.30652204707724, 18.10795765778859],
    [59.30212110595508, 18.1031511719144],
    [59.30330902697854, 18.095941499710477],
    [59.302106500446904, 18.08744431932576],
    [59.29915112261593, 18.081693702297752],
    [59.29347822063779, 18.07662967358663],
    [59.29315193932303, 18.063411889954896],
    [59.294622615876, 18.048820715515284],
    [59.29626852997669, 18.03972272439628],
    [59.2994237874927, 18.02890813117942],
    [59.305952488315775, 18.026075737717846],
    [59.31072772419747, 18.023929985095464],
  ];

  ngAfterViewInit(): void {
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
    this.map = L.map('map').setView(
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
