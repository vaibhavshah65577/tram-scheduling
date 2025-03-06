# Tram - Schedule

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Component Responsibilities

1. **TramMapComponent**

   - **File:** `src/app/components/tram-map/tram-map.component.ts`
   - **Purpose:**
     - Displays a map using Leaflet and shows the tram route between Luma and Linde.
     - Initializes the map, draws the tram track, and animates the tram movement along the route.
     - Adds banners at specific coordinates to mark tram stops.

2. **TramRouteComponent**

   - **File:** `src/app/components/tram-route/tram-route.component.ts`
   - **Purpose:**
     - Displays the tram route in detail when a user selects a tram from the schedule.
     - Initializes the map centered on the current tram location and draws the tram route.
     - Moves the tram along the route based on the countdown timer provided in the dialog data.

3. **TramScheduleComponent**

   - **File:** `src/app/components/tram-schedule/tram-schedule.component.ts`
   - **Purpose:**
     - Fetches and displays the tram schedule for departures from Luma to Linde.
     - Filters the fetched departure data to show only relevant trams.
     - Opens a dialog to display the tram route when a tram is selected.

4. **CountdownTimerComponent**

   - **File:** `src/app/components/countdown-timer/countdown-timer.component.ts`
   - **Purpose:**

     - Displays a countdown timer for the tram's arrival based on the departure data.
     - Updates the UI with the remaining time, progress percentage, and a motivational message.
     - Parses the display string to convert it into seconds for the countdown.

## Useful Features

- **View Tram Route** – Users can see the tram route from **Sickla to Liljeholmen** on the map.
- **Real-Time Tram Location** – Users can check the **real-time location** of a specific tram using the **Tram Route** feature.
- **Arrival Countdown** – Users can track the **remaining time** for a tram to arrive at **Luma**.

## Funny Features

- **Tram Progress Race** – Users can watch a **tram progress bar** race against the **remaining time**.
- **Funny Arrival Messages** – Users will see **funny messages** based on the **remaining time** until the tram arrives at **Luma**.
