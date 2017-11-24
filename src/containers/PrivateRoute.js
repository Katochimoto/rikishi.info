import {
  Redirect,
  Route,
} from 'react-router-dom';

import bioStore from '../data/store';

export default function PrivateRoute ({ component: Component, ...rest }) {
  return (
    <Route {...rest}
      render={props => renderPrivateComponent(Component, props)} />
  );
}

function renderPrivateComponent (Component, props) {
  if (bioStore.hasAccess()) {
    return (
      <Component {...props} />
    );
  }

  return (
    <Redirect to={{
      pathname: '/access',
      state: { from: props.location }
    }} />
  );
}
