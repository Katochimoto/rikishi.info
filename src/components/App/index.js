import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import About from '../About';

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
        </Switch>
      </div>
    </Router>
  );
}
