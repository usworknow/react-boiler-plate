// @flow

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import store from './redux/store';
import Login from './view/Login';
import Register from './view/Register';
import TodoList from './view/TodoList';
import '../public/scss/styles.scss';

const FourOhFour = () => <h1>404</h1>;

class App extends React.Component {
  constructor() {
    super();
    this.state = { data: null };
  }

  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="container">
            <div className="outer">
              <Switch>
                <PrivateRoute path="/todo-list" component={TodoList} />
                <Route exact path="/sign-in" component={Login} />
                <Route exact path="/sign-up" component={Register} />
                <Route component={FourOhFour} />
              </Switch>
            </div>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
