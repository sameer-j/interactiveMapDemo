import React from 'react';

class PieChart extends React.Component {
  componentDidMount() {
    const { params: { title, id, data }, callback } = this.props;
    // Create the chart
    window.Highcharts.chart(id, {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: title,
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true,
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
      series: data,
    });
  }

  render() {
    return (
      <div id={this.props.params.id} style={{ width: 450, height: 200 }}></div>
    );
  }
}

export default PieChart;