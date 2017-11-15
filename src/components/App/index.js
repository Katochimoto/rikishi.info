import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// import PrivateRoute from '../PrivateRoute';
import About from '../About';
import Access from '../Access';
import NoMatch from '../NoMatch';

import style from './index.css';

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
          {/*<PrivateRoute path="/cv" component={About} />*/}
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}
