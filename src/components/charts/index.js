import React from 'react';
import { connect } from 'react-redux';
// import BarChart from './bar';
import PieChart from './pie';
import { travelType, packageType, packagePieType } from '../../scripts/chartData';

class NumberOfBookingsChart extends React.Component {
  render () {
    const { data, getData } = this.props;
    if (data) {
      return (
        <div style={{ display: 'inline-block' }} >
          {/* <BarChart params={packageType(data.package_id, data.Car_Cancellation.cancelledPackageBookings)} /> */}
          <div style={{display: 'inline-block'}}>
            <h3 style={{ textAlign: 'center' }}>Package bookings</h3>
            <PieChart callback={(id) => getData({ type: 'package_id', id}) } params={packageType(data.package_id)} />
          </div>
          <div style={{display: 'inline-block'}}>
            <h3 style={{ textAlign: 'center' }}>Bookings for different travel types</h3>
            <PieChart callback={(id) => getData({ type: 'travel_type_id', id}) } params={travelType(data.travel_type_id)} />
          </div>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  data: state ? state.filtered : null,
});

const mapDispatchToProps = dispatch => ({
  getData: (payload) => {
    dispatch({ type: 'FILTER_POINT', payload })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NumberOfBookingsChart);