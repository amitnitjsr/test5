import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import albumListing from './component/albumListing/albumListing';
import userListing from './component/userListing/userListing';
import photoListing from './component/photoListing/photoListing';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={userListing} />
        <Route path='/albumListing' component={albumListing} />
        <Route path='/photoListing' component={photoListing} />
      </div>
    </BrowserRouter>
  );
}

export default App;
