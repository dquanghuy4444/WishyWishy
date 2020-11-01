import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Create from './pages/Create';
import Statistical from './pages/Statistical';
import Thank from './pages/Thank';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router , Route , Switch  } from 'react-router-dom';
import Setting from './pages/Setting';

function App() {
  return (
    <div>
      <Router>
        <Navbar>
          <Switch>
            <Route path='/' component={ Home } exact></Route>
            <Route path='/create' component={ Create } ></Route>
            <Route path='/statistical' component={ Statistical } ></Route>
            <Route path='/setting' component={ Setting } ></Route>
            <Route path='/thank' component={ Thank } ></Route>
            <Route path='/:somestring' component={ NotFound } ></Route>
          </Switch>
        </Navbar>
      </Router>   
    </div>
  );
}

export default App;
