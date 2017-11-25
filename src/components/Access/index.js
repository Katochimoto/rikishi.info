import { Link } from 'react-router-dom';
import Footer from '../Footer';

import style from './index.css';

export default function Access () {
  return (
    <div className={style.access}>
      <div className={style.accessContent}>
        <h1 className={style.accessHeader}>403</h1>
        <p>
          <Link to="/" className={style.accessBack}>Go to home</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}
