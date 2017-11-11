import { Link } from 'react-router-dom';
import Footer from '../Footer';

import style from './index.css';

export default function NoMatch () {

  return (
    <div className={style.nomatch}>
      <div className={style.nomatchContent}>
        <h1 className={style.nomatchHeader}>404</h1>
        <p>
          <Link to="/" className={style.nomatchBack}>Go to home</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}
