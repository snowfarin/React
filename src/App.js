import React, { Component } from 'react';
import Login from './components/js/Signin';
import Signup from './components/js/Signup';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import Blog from './components/js/Blog';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/blog">
              <Blog />
            </Route>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
