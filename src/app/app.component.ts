import { Component, Optional } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { first } from 'rxjs/operators';
import { Options } from 'highcharts';
import * as _ from 'lodash';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  chart: Chart;
  options: Options;

  chartOpt : 'column';

  ngOnInit() {
    this.init();
  }
  getColor(i){
   let colors =   ['orange', 'green', 'purple', 'brown' ,'silver', 'black', '#6AF9C4'];
   return colors[i];
  }
  addPoint() {
    if (this.chart) {
      this.chart.addPoint(Math.floor(Math.random() * 10));
    } else {
      alert('init chart, first!');
    }
  }

  addSerie() {
    this.chart.addSerie({
      // name: 'Line ' + Math.floor(Math.random() * 10),
      color:this.getColor(Math.random() * 11),
      data: [
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100)
      ],
    });
  }

  removePoint() {
    this.chart.removePoint(this.chart.ref.series[0].data.length - 1);
  }

  removeSerie() {
    this.chart.removeSerie(this.chart.ref.series.length - 1);
  }
  changeCity(e) {
    // this.chartOpt =

    this.chart.ref$.pipe(first()).subscribe(chart => {
      // chart.update({ chart: { type: 'column' } });
      this.updateChart({   chart: {
          type: e.target.value
        } });
    })
  }
  changeStack(e) {
    this.chart.ref$.pipe(first()).subscribe(chart => {
      // chart.update({ chart: { type: 'column' } });
      this.updateChart({   plotOptions: {
          series: {
            stacking: e.target.value
          }
        } });
    })
  }
  // export(){
  //   this.chart.options.exporting.enabled = true
  //   chart.exportChart(null, {
  //     chart: {
  //       backgroundColor: '#FFFFFF'
  //     }
  //   });
  // }
  init() {
    this.options = {
      chart: {
        type: this.chartOpt
      },
      title: {
        text: 'Energy Consumptionn'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Solar',
        data: [10, 20 ,30,40,50,60,70,80,91,100,110,120],
      },{
        name: 'Grid',
        data: [10, 110 ,100,90,80,63,73,50,43,33,33,10],
      }],

      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      },
      yAxis: {
        title: {
          text: 'Usage of power'
        }
      },
    exporting:{
        chartOptions:{

        }
    },  colors: ['blue', '#DDDF00', 'red', 'cyan', 'silver', 'black', '#6AF9C4']
    };
    let chart = new Chart(this.options);
    // chart.addPoint(4);
    // chart.setOption

    this.chart = chart;
    // chart.addPoint(5);
    setTimeout(() => {
      // chart.addPoint(6);
    }, 2000);

    chart.ref$.subscribe(c => console.log(c.options.chart));
  }

  changeType = () => {
    // this.chart.options.chart = {type: 'column'};
    this.chart.ref$.pipe(first()).subscribe(chart => {
      // chart.update({ chart: { type: 'column' } });
      this.updateChart({ chart: { type: 'column' } });
    })
  }

  private updateChart = (options: Options) => {
    // By default if the value of the object property is undefined lodash won't use this but keeps
    // the original after using _.merge(). We can customize the merge with _.mergeWith().
    // If we return undefined inside the customizer function lodash handles the merge like above not keeping the undefined value.
    // With deleting the property we trick lodash and with this the property gets undefined value after the merge.
    const customizer = (_objValue: Optional, srcValue: Optional, key: any, object: any) => {
      if (srcValue === undefined) delete object[key];
    };

    console.log(options.chart, options.plotOptions);
    const mergedOptions = _.mergeWith(this.options, options, customizer);
    console.log(mergedOptions.chart, mergedOptions.plotOptions);

    this.chart = new Chart(mergedOptions);
  };

}
