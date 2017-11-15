import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import About from '../About';
import Access from '../Access';
import NoMatch from '../NoMatch';

import style from './index.css';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/access',
        state: { from: props.location }
      }} />
    )
  )} />
);

export default function App () {
  // require.ensure([], (require) => {
  //   var jwt = require('openpgp');
  //   console.log('>>>2', jwt);
  // });

  return (
    <Router>
      <div className={style.app}>
        <Switch>
          <Route exact path="/" component={About} />
          <Route path="/about" component={About} />
          <Route path="/access/:token?" component={Access} />
          <PrivateRoute path="/test" component={About} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}
