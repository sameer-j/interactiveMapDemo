import React from 'react';

class BarChart extends React.Component {
  componentDidMount() {
    const { params: { title, id, data, categories } } = this.props;
    // Create the chart
    window.Highcharts.chart(id, {
      chart: {
        type: 'column'
      },
      title: { text: title },
      xAxis: {
        type: 'category',
        title: {
          text: ''
        },
        categories,
      },
      yAxis: {
        title: {
          text: 'Number of rides'
        },
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: false,
          }
        },
        column: {
          stacking: 'normal'
        }
      },

      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true,
      },

      credits: {
        enabled: false
      },

      series: data,
    });
  }

  render() {
    return (
      <div id={this.props.params.id} style={{ width: 400, height: 400 }}></div>
    );
  }
}

export default BarChart;