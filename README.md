# Interactive Map demo
This is sample app to demonstrate the plotting of various points on the Map, as well as applying filters to view view specific filtered information.

The demo app works for a specific CSV file format, serves XRiders to get meaningful information of their rides.
https://rinkuk1993.github.io/interactiveMapDemo/

# How it works
  - Upload CSV containing data of travel between two location points (demo file to be uploaded).
  - Once the data is uploaded, all booking locations are displayed in Map as clustures.
  - User can see filters for -
  -- What type travel plans are booked by users
  -- What are the different different packages that the users are using the most

# Bugs!!
  - Please use `Safari` or `Firefox` For best results for plotting almost 50k points on the map using the above library. Current version of chrome has some issue in plot the markers for large numbers https://github.com/Leaflet/Leaflet.markercluster/issues/951
  - No loader shown if big csv file is loaded


### Tech
This project uses a number of open source projects to work properly:

* [ReactJS](https://reactjs.org) - A JavaScript library for building user interfaces
* [Redux](https://react-redux.js.org/) - Official React bindings for Redux
* [Leaflet](https://leafletjs.com/) - Library for mobile-friendly interactive maps
* [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) - Marker Clustering plugin for Leaflet. It allows a meaningful way to plot huge amount of markers on the map.
And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### Installation

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.
```
git clone https://github.com/Rinkuk1993/interactiveMapDemo.git
```
Install the dependencies and devDependencies and start the server.
```sh
$ cd interactiveMapDemo
$ npm install
```
or 
```sh
$ cd interactiveMapDemo
$ yarn
```

### Development
Open your favorite Terminal and run these commands to run.
```npm start```

#### Building for source
For production release
``` npm run build ```


### Todos

 - Adding more filters -
 -- To show where more cancellations are happening
 -- When is the peak time of booking
 -- Which are the top 10 users booking frequently so any coupons / discount can be provided
 - Add loader after uploding big CSV file
 - Demo csv file

License
----

MIT
