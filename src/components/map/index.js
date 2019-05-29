import React from 'react';
import { connect } from 'react-redux';
import './map.css';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.progressLoader = this.progressLoader.bind(this);
  }
  
  componentDidMount() {
    var tiles = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: 'OpenStreetMap'
    }),
    latlng = window.L.latLng(12.92415,77.67229);
    this.map = window.L.map('map', { center: latlng, zoom: 13, layers: [tiles], scrollWheelZoom: false });
    this.markers = window.L.markerClusterGroup({ chunkedLoading: true, chunkProgress: this.progressLoader });
  }

  shouldComponentUpdate(nextProps) {
    if(nextProps.state) {
      let markerArray = [];
      let filterArray = nextProps.state.json.allIds;
      if (nextProps.state.currentFilter) {
        filterArray = nextProps.state.filtered[nextProps.state.currentFilter.type][nextProps.state.currentFilter.id];
      }
      this.markers.clearLayers();
      filterArray.map((id) => {
        const { from_lat, user_id, from_long, to_lat, to_long, from_date, vehicle_model_id } = nextProps.state.json.data[id];
        if(from_lat && from_long ) {
          let marker = new window.L.marker([from_lat, from_long], { id, user_id, to_lat, to_long, from_date, vehicle_model_id });
          markerArray.push(marker);
        }
      });
      var popup = window.L.popup();
      // Add info to tip
      this.markers.addLayers(markerArray);
      this.map.addLayer(this.markers);
      this.markers.on('click', (event) => {
        const { id, user_id, to_lat, to_long, from_date, vehicle_model_id } = event.layer.options;
        if(this.routing) {
          this.map.removeControl(this.routing);
        }
        this.routing = window.L.Routing.control({
          waypoints: [
            window.L.latLng(event.latlng),
            window.L.latLng(to_lat, to_long)
          ]}).addTo(this.map);
        popup
          .setLatLng(event.latlng)
          .setContent(`Ride Time : ${from_date} <br> Vehicle Id : ${vehicle_model_id} <br> User Id: ${user_id}`)
          .openOn(this.map);
      });
      this.map.on('click', () => {
        this.map.removeControl(this.routing);
      });
      var group = new window.L.featureGroup(markerArray);
      this.map.fitBounds(group.getBounds());
    }
    return false;
  }

  progressLoader(processed, total, elapsed, layersArray) {
    if (elapsed > 1000) {
      console.log(' ==================== loading : ', Math.round(processed/total*100) + '%');
    }
  }

  render() {
    return (
      <div id="map" />
    );
  }
};

const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(Map);
