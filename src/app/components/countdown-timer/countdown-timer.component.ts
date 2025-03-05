import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Departure } from '../../types/departures.types';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrl: './countdown-timer.component.scss',
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  @Input() departureData!: Departure;

  private timerSubscription: Subscription | null = null;
  private remainingSeconds: number = 0;

  public remainingTimer: string = '';
  public fortuneOfTram: string = '';
  public progress: number = 0;

  ngOnInit(): void {
    this.initializeTimer();
  }

  /**
   * Initializes the countdown timer, computes initial values, and starts an interval to update the timer every second.
   */
  private initializeTimer(): void {
    this.remainingSeconds = this.parseDisplayToSeconds(
      this.departureData.display,
    );
    this.updateUI();

    // Start the interval for countdown updates
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.updateUI();
      }
    });
  }

  /**
   * Updates the UI elements including the countdown timer, progress bar, and fortune message.
   */
  private updateUI(): void {
    this.remainingTimer = this.formatCountdown(this.remainingSeconds);
    this.progress = this.calculateProgress();
    this.fortuneOfTram = this.getFortuneMessage(this.remainingSeconds);
  }

  /**
   * Formats the remaining time into a `MM:SS Minute` format.
   * @param seconds The remaining time in seconds.
   * @returns A formatted countdown string.
   */
  private formatCountdown(seconds: number): string {
    if (seconds <= 0) return 'Nu'; // Display "Nu" when time is up
    const minutes = Math.floor(seconds / 60);
    return `${this.padNumber(minutes)}:${this.padNumber(seconds % 60)} Minute`;
  }

  /**
   * Pads a single-digit number with a leading zero (e.g., 5 → "05").
   * @param num The number to be padded.
   * @returns A two-character string representation of the number.
   */
  private padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }

  /**
   * Converts a string like "5 min" into seconds (e.g., "5 min" → 300 seconds).
   * @param display The departure display string.
   * @returns The time in seconds.
   */
  private parseDisplayToSeconds(display: string): number {
    const match = display.match(/^(\d+)\s*min$/);
    return match ? parseInt(match[1], 10) * 60 : 0;
  }

  /**
   * Generates a fortune message based on the remaining countdown time.
   * @param countdown The remaining time in seconds.
   * @returns A motivational or informative message.
   */
  private getFortuneMessage(countdown: number): string {
    if (countdown < 60) return 'Hurry! Your tram is almost here! 🚋💨';
    if (countdown < 400)
      return "Relax, you've got a few minutes. Maybe check your phone? 📱";
    return 'Plenty of time! Perhaps grab a coffee before your ride. ☕';
  }

  /**
   * Calculates the progress percentage for the tram arrival.
   * @returns A number between 0 and 100 representing the progress percentage.
   */
  private calculateProgress(): number {
    return Math.min(((660 - this.remainingSeconds) / 660) * 100, 100);
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }
}
