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
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
    }),
    latlng = window.L.latLng(12.92415,77.67229);
		this.map = window.L.map('map', { center: latlng, zoom: 13, layers: [tiles] });
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
        const { from_lat, from_long } = nextProps.state.json.data[id];
        if(from_lat && from_long ) {
          let marker = new window.L.marker([from_lat, from_long]);
          markerArray.push(marker);
        }
      });
      // Add info to tip
      this.markers.addLayers(markerArray);
      this.map.addLayer(this.markers);
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
