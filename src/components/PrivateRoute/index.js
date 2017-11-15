import {
  Redirect,
  Route,
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
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

export default PrivateRoute;
