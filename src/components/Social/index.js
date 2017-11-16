import { Link } from 'react-router-dom';
import Icon from '../Icon';

import style from './index.css';

export default function Social () {
  return (
    <ul className={style.social}>
      <li className={style.socialItem}>
        <a href="https://www.facebook.com/tursenev"
          title="Facebook"
          className={style.socialLink}
          rel="nofollow"
          target="_blank">
          <Icon type="facebook" size="m" className={style.socialIcon} />
        </a>
      </li>
      <li className={style.socialItem}>
        <a href="https://github.com/Katochimoto"
          title="GitHub"
          className={style.socialLink}
          rel="nofollow"
          target="_blank">
          <Icon type="github" size="m" className={style.socialIcon} />
        </a>
      </li>
      <li className={style.socialItem}>
        <a href="https://www.linkedin.com/in/rikishi/"
          title="Linkedin"
          className={style.socialLink}
          rel="nofollow"
          target="_blank">
          <Icon type="linkedin" size="m" className={style.socialIcon} />
        </a>
      </li>
      <li className={style.socialItem}>
        <Link to="/" className={style.socialLink}>...</Link>
      </li>
      <li className={style.socialItem}>
        <Link to="/about" className={style.socialLink}>...</Link>
      </li>
      <li className={style.socialItem}>
        <Link to="/access" className={style.socialLink}>...</Link>
      </li>
    </ul>
  );
}
