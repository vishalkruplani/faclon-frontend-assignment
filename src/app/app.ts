import { Component } from '@angular/core';
import { ChartComponent } from './chart/chart';
import { ChartOptions } from './chart/chart.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChartComponent],
  template: `
    <h1 style="text-align:center; font-family:sans-serif; margin-bottom: 40px;">Custom Chart Component Demo</h1>
    
    <io-chart [chartOptions]="exampleData"></io-chart>

    <io-chart [chartOptions]="columnData"></io-chart>

    <io-chart [chartOptions]="pieData"></io-chart>
  `
})
export class AppComponent {
  exampleData: ChartOptions = {
    type: 'line',
    title: 'Sales Report',
    series: [
      { name: 'Offline', value: 30, color: 'red' },
      { name: 'Online', value: 70, color: 'blue' }
    ]
  };

  columnData: ChartOptions = {
    type: 'column',
    title: 'Monthly Revenue',
    series: [
      { name: 'Q1', value: 500, color: '#4bc0c0' },
      { name: 'Q2', value: 700, color: '#36a2eb' },
      { name: 'Q3', value: 400, color: '#ff6384' },
      { name: 'Q4', value: 650, color: '#ff9f40' }
    ]
  };

  pieData: ChartOptions = {
    type: 'pie',
    title: 'User Distribution',
    series: [
      { name: 'Mobile', value: 60, color: '#FF6384' },
      { name: 'Desktop', value: 40, color: '#36A2EB' },
      { name: 'Tablet', value: 20, color: '#FFCE56' }
    ]
  };
}