import Footer from '../Footer'
import CardContainer from '../../containers/CardContainer'
import BioContainer from '../../containers/BioContainer'

import style from './index.css'

export default function About (props) {
  return (
    <div className={style.about}>
      { props.match.path === '/' ? <CardContainer {...props} /> : <BioContainer {...props} /> }
      <Footer />
    </div>
  );
}
