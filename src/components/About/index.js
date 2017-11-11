import Footer from '../Footer';
import Card from '../Card';

import style from './index.css';

export default function About ({ match }) {

  // if (match.path === '/about') {
  //   console.log('>>>1');

  //   require.ensure([], (require) => {
  //     var jwt = require('jsrsasign');
  //     console.log('>>>2', jwt);
  //   });
  // }

  return (
    <div className={style.about}>
      <Card />
      <Footer />
    </div>
  );
}
