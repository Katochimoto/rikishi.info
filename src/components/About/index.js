import Footer from '../Footer'
import CardContainer from '../../containers/CardContainer'
import BioContainer from '../../containers/BioContainer'

import style from './index.css'

export default function About ({ match }) {
  return (
    <div className={style.about}>
      { match.path === '/' ? <CardContainer /> : <BioContainer /> }
      <Footer />
    </div>
  );
}
