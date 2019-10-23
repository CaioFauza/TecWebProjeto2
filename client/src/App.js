import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Metrics from './components/Metrics';
import Playlists from './components/Playlists';
import { Provider } from 'react-redux';
import { Store } from './modules/store';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/data" component={Metrics} />
        <Route exact path="/playlists" component={Playlists} />
      </div>
    </Router>

  );
}

export default App;


