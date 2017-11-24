import Bundle from './Bundle';
import Loading from '../components/Loading';
import loadAccess from 'bundle-loader?lazy!../components/Access'

// require.ensure([], (require) => {
  //   var jwt = require('openpgp');
  //   console.log('>>>2', jwt);
  // });

// if (match.path === '/about') {
  //   console.log('>>>1');

  //   require.ensure([], (require) => {
  //     var jwt = require('jsrsasign');
  //     console.log('>>>2', jwt);
  //   });
  // }

export default function AccessLazy (...props) {
  return (
    <Bundle load={loadAccess}>
      {(Access) => (
        Access ?
          <Access {...props} /> :
          <Loading />
      )}
    </Bundle>
  );
}
