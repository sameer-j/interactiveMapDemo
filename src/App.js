import React from 'react';
import Map from './components/map';
import { Provider } from 'react-redux';
import Uploader from './components/csvUploader';
import NumberOfBookingsChart from './components/charts';
import { store } from './store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div style={{ display: 'inline-block', width: '100%' }}>
            <h1 style={{ display: 'inline-block' }}>Interactive Map demo</h1>
            <Uploader />
          </div>
          <Map />
          <NumberOfBookingsChart />
        </div>
      </Provider>
    );
  }
}
