import {
  OnChanges,
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';

import { OrgChart } from 'd3-org-chart';
import * as d3 from 'd3';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css']
})
export class OrgChartComponent implements OnInit, OnChanges {
  @ViewChild('chartContainer') chartContainer: ElementRef;
  @Input() data: any[];
  chart;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (!this.chart) {
      this.chart = new OrgChart();
    }
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }
  updateChart() {
    if (!this.data) {
      return;
    }
    if (!this.chart) {
      return;
    }
    this.chart
      .container(this.chartContainer.nativeElement)
      .data(this.data)
      .rootMargin(100)
      .nodeWidth(d => 210)
      .nodeHeight(d => 140)
      .childrenMargin((d) => 130)
      .compactMarginBetween((d) => 75)
      .compactMarginPair((d) => 80)
      .nodeContent(function (d, i, arr, state) {
        const colors = [
          '#6E6B6F',
          '#18A8B6',
          '#F45754',
          '#96C62C',
          '#BD7E16',
          '#802F74',
        ];
        const color = colors[d.depth % colors.length];
        const imageDim = 80;
        const lightCircleDim = 95;
        const outsideCircleDim = 110;

        return `
            <div style="background-color:white; position:absolute;width:${
              d.width
            }px;height:${d.height}px;">
               <div style="background-color:${color};position:absolute;margin-top:-${outsideCircleDim / 2}px;margin-left:${d.width / 2 - outsideCircleDim / 2}px;border-radius:100px;width:${outsideCircleDim}px;height:${outsideCircleDim}px;"></div>
               <div style="background-color:#ffffff;position:absolute;margin-top:-${
                 lightCircleDim / 2
               }px;margin-left:${d.width / 2 - lightCircleDim / 2}px;border-radius:100px;width:${lightCircleDim}px;height:${lightCircleDim}px;"></div>
               <img src=" ${
                 d.data.imageUrl
               }" style="position:absolute;margin-top:-${imageDim / 2}px;margin-left:${d.width / 2 - imageDim / 2}px;border-radius:100px;width:${imageDim}px;height:${imageDim}px;" />
               <div class="card" style="top:${
                 outsideCircleDim / 2 + 10
               }px;position:absolute;height:30px;width:${d.width}px;background-color:#3AB6E3;">
                  <div style="background-color:${color};height:28px;text-align:center;padding-top:10px;color:#ffffff;font-weight:bold;font-size:16px">
                      ${d.data.name} 
                  </div>
                  <div style="background-color:#F0EDEF;height:28px;text-align:center;padding-top:10px;color:#424142;font-size:16px">
                      ${d.data.positionName} 
                  </div>
               </div>
           </div>`;
          })
      .render();
  }
}