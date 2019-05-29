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
      var destinationIcon = window.L.icon({
        iconUrl: 'https://png.pngtree.com/svg/20170502/91a8305b9c.png',
        iconSize:     [45, 45], // size of the icon
        iconAnchor:   [22, 64], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 22],  // the same for the shadow
        popupAnchor:  [-3, -36] // point from which the popup should open relative to the iconAnchor
    });
      var popup = window.L.popup();
      // Add info to tip
      this.markers.addLayers(markerArray);
      this.map.addLayer(this.markers);
      this.markers.on('click', (event) => {
        const { user_id, to_lat, to_long, from_date, to_date, id } = event.layer.options;
        if(this.destinationMarker) {
          this.map.removeLayer(this.destinationMarker);
        }
        if(to_lat && to_long) {
          this.destinationMarker = new window.L.marker([to_lat, to_long], {icon: destinationIcon}).addTo(this.map);;
        }
        var newgroup = new window.L.featureGroup([this.destinationMarker, event.target]);
        this.map.fitBounds(newgroup.getBounds());
        popup
          .setLatLng(event.latlng)
          .setContent(`Booking Id : ${id} <br> Start Time : ${from_date} <br> End Time : ${to_date || 'Unknown'} <br> User Id: ${user_id} ${!to_lat || !to_long ? '<br> Destination: Unknown' : ''}`)
          .openOn(this.map);
      });
      this.map.on('click', () => {
        if (this.destinationMarker) {
          this.map.removeLayer(this.destinationMarker);
        }
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
