import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import PrivateRoute from '../../containers/PrivateRoute';
import AccessLazy from '../../containers/AccessLazy';
import About from '../About';
import NoMatch from '../NoMatch';

import style from './index.css';

export default function App () {
  return (
    <Router>
      <div className={style.app}>
        <Switch>
          <Route exact path="/" component={About} />
          <PrivateRoute path="/about" component={About} />
          <Route path="/access/:token?" component={AccessLazy} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}
