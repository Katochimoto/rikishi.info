import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import PrivateRoute from '../../containers/PrivateRoute'
import AccessLazy from '../../containers/AccessLazy'
import CheckAccess from '../../containers/CheckAccess'
import About from '../About'
import NoMatch from '../NoMatch'

import style from './index.css'

export default function App () {
  return (
    <Router>
      <div className={style.app}>
        <CheckAccess />
        <Switch>
          <Route exact path="/" component={About} />
          <PrivateRoute path="/bio" component={About} />
          <Route path="/access/:token?" component={AccessLazy} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  )
}
