import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import About from '../About';

import style from './index.css';

export default function App () {
  return (
    <Router>
      <div className={style.app}>
        <Route exact path="/" component={About} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
}
