import React from 'react';
import { connect } from 'react-redux';

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  
  onChangeHandler(event) {
    const file = event.target.files[0];
    // This can be added in middleware
    var reader = new FileReader();
    const self = this;
    reader.onload = function(event) {
      const fileData = event.target.result;
      self.props.getData(fileData);
    };
    reader.readAsText(file);
  }
  
  render () {
    return (
      <div style={{float: 'right', display: 'inline-block', paddingTop: '30px' }}>
        { this.props.state && this.props.state.currentFilter && (
          <button
            className="btn btn-default"
            style={{ margin: '10px 10px 10px 0' }}
            onClick={this.props.resetFilters}>Reset Filters</button>
        )}
        { !this.props.state && (
          <input
            id="selectFileButton"
            type="file"
            accept=".csv, text/csv"
            multiple=""
            onChange={this.onChangeHandler}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state,
});

const mapDispatchToProps = dispatch => ({
  getData: (file) => {
    dispatch({ type: 'STORE_DATA', payload: file })
  },
  resetFilters: () => {
    dispatch({ type: 'RESET_FILTER' })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);