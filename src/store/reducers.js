import { getJsonWithFilterables } from '../scripts/csvTojson';
import XRideFilterables from '../scripts/filterables';

const defaultState = null;

const constructData = (csv) => {
  const generalisedData = getJsonWithFilterables(csv, XRideFilterables);
  // Add additional filters
  const cancelledPackageBookings = {};
  const travelPerPackage = {};
  Object.keys(generalisedData.filtered.package_id).map((key) => {
    const pack = generalisedData.filtered.package_id[key]; // Array of Ids
    cancelledPackageBookings[key] = pack.filter(value => -1 !== generalisedData.filtered.Car_Cancellation[1].indexOf(value));
    Object.keys(generalisedData.filtered.travel_type_id).map((travelKey) => {
      if(!travelPerPackage[travelKey]) {
        travelPerPackage[travelKey] = {};
      }
      travelPerPackage[travelKey][key] = pack.filter(value => -1 !== generalisedData.filtered.travel_type_id[travelKey].indexOf(value));
    })
  });
  generalisedData.filtered.travelPerPackage = travelPerPackage;
  generalisedData.filtered.cancelledPackageBookings = cancelledPackageBookings;
  console.log('generalisedData', generalisedData);
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
