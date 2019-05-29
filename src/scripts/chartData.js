import { PackageName, TravelName, OnlineBookingName } from '../scripts/constant';

const travelType = (travelTypes) => {
  const title = '';
  const id = 'travelChart';
  const dataArray = Object.keys(travelTypes).map((id) => ({
    name: TravelName[id],
    y: travelTypes[id] ? travelTypes[id].length : 0,
    id,
  }));
  const data = [{
    name: 'Travel',
    colorByPoint: true,
    data: dataArray
  }];
  
  return {
    id,
    data,
    title,
  }
};

const packageType = (packages) => {
  const title = '';
  const id = 'packagePie';
  const dataArray = Object.keys(packages).map((id) => ({
    name: PackageName[id],
    y: packages[id] ? packages[id].length : 0,
    id,
  }));
  const data = [{
    name: 'Packages',
    colorByPoint: true,
    data: dataArray,
  }];
  
  return {
    id,
    data,
    title,
  }
}

const packageVsCancellation = (packages, cancelledPackage) => {
  // If a package is not used in any booking, it will not be shown in graph
  const bookings = Object.keys(packages).map((key) => {
    return {
      y: packages[key].length - cancelledPackage[key].length,
      id: key,
    };
  });
  const cancelledBooking = Object.keys(cancelledPackage).map((key) => {
    return {
      y: cancelledPackage[key].length,
      id: key,
    }
  });
  const title = 'Packages';
  const categories = ['Package 1', 'Package 2', 'Package 3', 'Package 4', 'Package 5', 'Package 6', 'Package 7', 'Others'];
  const id = 'Packages';
  const data = [{
    name: 'Successfull Booking',
    data: bookings,
    index:1,
    id: 'package_id',
  }, {
    name: 'Cancelled',
    data: cancelledBooking,
    color: 'red',
    index: 0,
    id: 'cancelledPackageBookings',
  }];
  return {
    id,
    data,
    title,
    categories,
  }
}

const packagePerTravelType = (travelPerPackage) => {
  const renderArray = {};
  Object.keys(travelPerPackage).map((travel) => {
    renderArray[travel] = [];
    Object.keys(travelPerPackage[travel]).map((pack) => {
      renderArray[travel].push(travelPerPackage[travel][pack].length)
    });
  });
  const categories = ['Package 1', 'Package 2', 'Package 3', 'Package 4', 'Package 5', 'Package 6', 'Package 7', 'Others'];
  const id = 'travelPacks';
  const data = [{
    name: 'Long Distance',
    data: renderArray[1],
  }, {
    name: 'Point to Point',
    data: renderArray[2],
  }, {
    name: 'Hourly Rental',
    data: renderArray[3],
  }];
  return {
    id,
    data,
    title: '',
    categories,
  }
}

const onlineBooking = (onlineBookings) => {
  const title = '';
  const id = 'onlineBooking';
  const dataArray = Object.keys(onlineBookings).map((id) => ({
    name: OnlineBookingName[id],
    y: onlineBookings[id] ? onlineBookings[id].length : 0,
    id,
  }));
  const data = [{
    name: 'Online booking',
    colorByPoint: true,
    data: dataArray,
  }];
  
  return {
    id,
    data,
    title,
  }
}

export {
  travelType,
  packageType,
  packageVsCancellation,
  packagePerTravelType,
  onlineBooking,
}