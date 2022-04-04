import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-emp-info',
  templateUrl: './emp-info.component.html',
  styleUrls: ['./emp-info.component.css']
})

export class EmpInfoComponent {
  data: any[];

  ngOnInit() {
    d3.csv(
      'https://raw.githubusercontent.com/Lazeeez/anything/main/fin2.csv'
    ).then((data) => {
      this.data = data;
      console.log(data)
    });
  }
}
