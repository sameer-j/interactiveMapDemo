import React from 'react';

class BarChart extends React.Component {
  componentDidMount() {
    const { params: { id, data, categories }, callback } = this.props;
    window.Highcharts.chart(id, {
      chart: {
          type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: categories,
      },
      yAxis: {
          min: 0,
          title: {
            text: 'Percent'
          },
          stackLabels: {
              enabled: true,
              style: {
                  fontWeight: 'bold',
                  color: (window.Highcharts.theme && window.Highcharts.theme.textColor) || 'gray'
              }
          }
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
          column: {
            stacking: 'percent',
            dataLabels: {
              enabled: true,
              color: (window.Highcharts.theme && window.Highcharts.theme.dataLabelsColor) || 'white'
            },
            point: {
              events: {
                  click: function () {
                    callback(this.id);
                  }
              }
            }
          }
      },
      credits: {
        enabled: false
      },
      series: data
    });
  }

  render() {
    return (
      <div id={this.props.params.id} style={{ width: 500, height: 300 }}></div>
    );
  }
}

export default BarChart;