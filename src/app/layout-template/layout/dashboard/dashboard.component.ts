import { Component, ViewChild } from '@angular/core';
import {
  IGroupedTransaction,
  ITransaction,
} from '../../../models/ITransaction.interface';
import { TransactionService } from '../../../services/transaction.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';
import { ICount } from '../../../models/ICount.interface';
import { DashboardService } from '../../../services/dashboard.service';
import { count } from 'rxjs';
import { AlertService } from '../../../services/alert.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  transactions: ITransaction[] = [];
  groupedTransactions: IGroupedTransaction = { transactionPerMonth: [] };
  monthlyCapital: number[] = [];
  monthlyRevenue: number[] = [];
  monthlyNetProfit: number[] = [];
  countData: ICount | null = null;

  constructor(
    private _transactionService: TransactionService,
    private _dashboardService: DashboardService,
    private _alertService: AlertService
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Revenue',
          data: this.monthlyRevenue,
        },
        {
          name: 'Capital',
          data: this.monthlyCapital,
        },

        {
          name: 'Net Profit',
          data: this.monthlyNetProfit,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadiusApplication: 'around',
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          colors: ['#84dcc6', '#df7373', '#61a5c2'],
        },
      },

      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      yaxis: {
        title: {
          text: 'Php (thousands)',
        },
      },
      fill: {
        opacity: 1,
        colors: ['#84dcc6', '#df7373', '#61a5c2'],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return 'Php ' + val + ' ';
          },
        },
      },
      legend: {
        markers: {
          fillColors: ['#84dcc6', '#df7373', '#61a5c2'],
        },
      },
    };

    this.getTransactions();

    this._dashboardService.getDashboardCountData().subscribe({
      next: (res) => {
        this.countData = res;
        console.log(res);
      },
      error: (err) => {
        this._alertService.showAlertSuccess("Couldn't load data.");
        console.log(err.message);
      },
    });
  }

  getTransactions() {
    this._transactionService.getTransactions().subscribe({
      next: (res) => {
        this.transactions = res;
        this.groupedTransactions =
          this._transactionService.groupTransactionByMonth(this.transactions);

        this.groupedTransactions.transactionPerMonth.forEach((tperMonth) => {
          this.monthlyCapital.unshift(
            this._transactionService.getMonthlyCapital(
              tperMonth.transactionPerWeek
            )
          );

          this.monthlyRevenue.unshift(
            this._transactionService.getMonthlyRevenue(
              tperMonth.transactionPerWeek
            )
          );

          this.monthlyNetProfit.unshift(
            Math.round(
              this._transactionService.getMonthlyRoi(
                tperMonth.transactionPerWeek
              )
            )
          );
        });

        console.log('Monthly capital: ', this.monthlyCapital);
        console.log('Monthly revenue: ', this.monthlyRevenue);
        console.log('Monthly netProfit: ', this.monthlyNetProfit);
      },
    });
  }
}
