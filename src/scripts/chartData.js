const travelType = (travelTypes) => {
  const title = '';
  const id = 'travelChart';
  const data = [{
    name: 'Travel',
    colorByPoint: true,
    data: [{
      name: 'Long distance',
      y: travelTypes[1].length,
      id: 1,
    }, {
      name: 'Point to Point',
      y: travelTypes[2].length,
      id: 2,
    }, {
      name: 'Hourly rental',
      y: travelTypes[3].length,
      id: 3,
    }]
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
  const data = [{
    name: 'Packages',
    colorByPoint: true,
    data: [{
      name: 'Package 1',
      y: packages[1] ? packages[1].length : 0,
      id: 1,
    }, {
      name: 'Package 2',
      y: packages[2] ? packages[2].length : 0,
      id: 2,
    }, {
      name: 'Package 3',
      y: packages[3] ? packages[3].length : 0,
      id: 3,
    },{
      name: 'Package 4',
      y: packages[4] ? packages[4].length : 0,
      id: 4,
    },{
      name: 'Package 5',
      y: packages[5] ? packages[5].length : 0,
      id: 5,
    },{
      name: 'Package 6',
      y: packages[6] ? packages[6].length : 0,
      id: 6,
    },{
      name: 'Package 7',
      y: packages[7] ? packages[7].length : 0,
      id: 7,
    },{
      name: 'Others',
      y: packages['others'] ? packages['others'].length : 0,
      id: 'others',
    }]
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
    return packages[key].length - cancelledPackage[key].length;
  });
  const cancelledBooking = Object.keys(cancelledPackage).map((key) => {
    return cancelledPackage[key].length;
  })
  const title = 'Packages';
  const categories = ['Package 1', 'Package 2', 'Package 3', 'Package 4', 'Package 5', 'Package 6', 'Package 7', 'Others'];
  const id = 'Packages';
  const data = [{
    name: 'Successfull Booking',
    data: bookings,
    index:1,
  }, {
    name: 'Cancelled',
    data: cancelledBooking,
    color: 'red',
    index: 0,
  }];
  return {
    id,
    data,
    title,
    categories,
  }
}

export {
  travelType,
  packageType,
  packageVsCancellation,
}