import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private _datePipe: DatePipe) {
    this.getCurrentTime();
  }

  currentDate: Date = new Date();
  currentTime: string | null = null;

  getCurrentTime = () => {
    setInterval(() => {
      const time = new Date();
      this.currentTime = this._datePipe.transform(time, 'hh:mm:ss');
    }, 1000);
  };
}
