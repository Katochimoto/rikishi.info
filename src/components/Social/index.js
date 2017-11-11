import style from './index.css';

import { Link } from 'react-router-dom';

export default function Social () {
  return (
    <ul className={style.social}>
      <li className={style.socialItem}>
        <a href="#" className={style.socialLink} rel="nofollow" target="_blank">Twitter</a>
      </li>
      <li className={style.socialItem}>
        <a href="#" className={style.socialLink} rel="nofollow" target="_blank">GitHub</a>
      </li>
      <li className={style.socialItem}>
        <a href="#" className={style.socialLink} rel="nofollow" target="_blank">Linkedin</a>
      </li>
      <li className={style.socialItem}>
        <Link to="/" className={style.socialLink}>...</Link>
      </li>
      <li className={style.socialItem}>
      <Link to="/about" className={style.socialLink}>...</Link>
    </li>
    </ul>
  );
}
