import {
  Redirect,
  Route,
} from 'react-router-dom';

export default function PrivateRoute ({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => (
      false ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/access',
          state: { from: props.location }
        }} />
      )
    )} />
  );
}
