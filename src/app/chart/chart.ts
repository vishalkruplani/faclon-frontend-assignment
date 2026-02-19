import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartOptions, ChartSeries } from './chart.interface';

@Component({
  selector: 'io-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.html',
  styleUrls: ['./chart.scss']
})
export class ChartComponent implements OnChanges {

  @Input() chartOptions!: ChartOptions;

  width = 600;
  height = 400;
  padding = 50;

  // Accessibility IDs for SVG <title> and <desc>
  titleId = 'chart-title-' + Math.random().toString(36).slice(2, 9);
  descId = 'chart-desc-' + Math.random().toString(36).slice(2, 9);

  maxDataValue = 0;
  columnWidth = 0;
  linePoints = '';
  pieSlices: { name: string; value: number; color: string; d: string }[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartOptions?.series?.length) {
      this.processData();
    }
  }

  processData() {
    const series = this.chartOptions.series;
    this.maxDataValue = Math.max(...series.map(s => s.value)) * 1.1;
    const availableWidth = this.width - (this.padding * 2);

    if (this.chartOptions.type === 'column') {
      this.columnWidth = (availableWidth / series.length) * 0.6;
    }

    if (this.chartOptions.type === 'line') {
      this.calculateLinePoints(series);
    }

    if (this.chartOptions.type === 'pie') {
      this.calculatePieSlices(series);
    }
  }

  getBarHeight(value: number): number {
    const availableHeight = this.height - (this.padding * 2);
    return (value / this.maxDataValue) * availableHeight;
  }

  calculateLinePoints(series: ChartSeries[]) {
    const availableWidth = this.width - (this.padding * 2);
    const availableHeight = this.height - (this.padding * 2);

    const step = series.length > 1
      ? availableWidth / (series.length - 1)
      : 0;

    this.linePoints = series.map((s, i) => {
      const x = this.padding + (i * step);
      const y = this.height - this.padding -
        ((s.value / this.maxDataValue) * availableHeight);
      return `${x},${y}`;
    }).join(' ');
  }

  calculatePieSlices(series: ChartSeries[]) {
    const total = series.reduce((sum, s) => sum + s.value, 0);
    let startAngle = 0;
    const radius = Math.min(this.width, this.height) / 3;
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    this.pieSlices = series.map(s => {
      const angle = (s.value / total) * 360;
      const path = this.getPiePath(
        centerX,
        centerY,
        radius,
        startAngle,
        startAngle + angle
      );
      startAngle += angle;
      return {
        name: s.name,
        value: s.value,
        color: s.color,
        d: path
      };
    });
  }

  getPiePath(
    cx: number,
    cy: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ): string {
    const start = this.polarToCartesian(cx, cy, radius, endAngle);
    const end = this.polarToCartesian(cx, cy, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `
      M ${cx} ${cy}
      L ${start.x} ${start.y}
      A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}
      Z
    `;
  }

  polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
}


