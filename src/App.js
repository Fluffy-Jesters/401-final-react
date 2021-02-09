import React from 'react';
import {useSelector, Provider} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss'
import Landing from './components/landing-page/landingPage.js';
import Game from './components/player-hub/game-table/gameTable.js';
import About from './components/aboutPage/aboutPage.js';
import Rules from './components/rules/rules.js';
import PlayerHub from './components/player-hub/playerHub.js';
import store from './store/store.js';


function App () {
  const user = useSelector( state => state.user);



  return (
    <div className='App'>
    <Provider store={store}>
    <BrowserRouter>
      <div className="apps-background">
          <Switch>
            <Route exact path='/' component={Landing}/>
            <Route exact path='/game' component={Game}/>
            <Route path="/about" component={About}/>
            <Route path="/rules" component={Rules}/>
            <Route path="/playerHub" component={PlayerHub}/>
          </Switch>
      </div>
      </BrowserRouter>
      </Provider>  
    </div>
  );
};

export default App;