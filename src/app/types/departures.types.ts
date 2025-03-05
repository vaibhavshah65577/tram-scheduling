export interface Departure {
  destination: string;
  direction_code: number;
  direction: string;
  state: string;
  display: string;
  scheduled: string;
  expected: string;
  journey: {
    id: number;
    state: string;
    prediction_state?: string;
  };
  stop_area: StopArea;
  stop_point: StopPoint;
  line: Line;
  deviations: any[];
  countdown: number;
}

export interface StopArea {
  id: number;
  name: string;
  type: string;
}

export interface StopPoint {
  id: number;
  name: string;
  designation?: string;
}

export interface Line {
  id: number;
  designation: string;
  transport_mode: string;
  group_of_lines?: string;
}

export interface StopDeviation {
  id: number;
  importance_level: number;
  message: string;
  scope: {
    stop_areas: StopArea[];
    stop_points: StopPoint[];
    lines: Line[];
  };
}

export interface DepartureResponse {
  departures: Departure[];
  stop_deviations: StopDeviation[];
}
