import Footer from '../Footer';
import CardContainer from '../../containers/CardContainer';

import style from './index.css';

export default function About ({ match }) {
  return (
    <div className={style.about}>
      <CardContainer />
      <Footer />
    </div>
  );
}
