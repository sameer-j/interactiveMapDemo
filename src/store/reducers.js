import { getJsonWithFilterables } from '../scripts/csvTojson';
import XRideFilterables from '../scripts/filterables';

const defaultState = null;

const constructData = (csv) => {
  const generalisedData = getJsonWithFilterables(csv, XRideFilterables);
  // Add additional filters
  const cancelledPackageBookings = {};
  Object.keys(generalisedData.filtered.package_id).map((key) => {
    const pack = generalisedData.filtered.package_id[key];
    cancelledPackageBookings[key] = pack.filter(value => -1 !== generalisedData.filtered.Car_Cancellation[1].indexOf(value));
  });
  generalisedData.filtered.Car_Cancellation.cancelledPackageBookings = cancelledPackageBookings;
  return generalisedData;
}

const xRider = (state = defaultState, action) => {
  switch (action.type) {
    case 'STORE_DATA':
      return constructData(action.payload);
    case 'FILTER_POINT':
      return {
        ...state,
        currentFilter: {
          type: action.payload.type,
          id: action.payload.id,
        }
      };
    case 'RESET_FILTER':
      return {
        ...state,
        currentFilter: null,
      };
    default:
      return state;
  }
};

export default xRider;
