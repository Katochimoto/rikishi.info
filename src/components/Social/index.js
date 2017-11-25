import { Link } from 'react-router-dom';
import Icon from '../Icon';

import style from './index.css';

export default function Social ({
  facebook,
  github,
  hasAccess,
  linkedin,
}) {
  return (
    <ul className={style.social}>
      {facebook ? item({ href: facebook, title: 'Facebook', type: 'facebook' }) : null}
      {github ? item({ href: github, title: 'GitHub', type: 'github' }) : null}
      {linkedin ? item({ href: linkedin, title: 'Linkedin', type: 'linkedin' }) : null}
      {hasAccess ? (
        <li className={style.socialItem}>
          <Link to="/bio" className={style.socialLink}>
            <Icon type="v-card" size="m" className={style.socialIcon} />
          </Link>
        </li>
      ) : null}
    </ul>
  );
}

function item ({
  href,
  title,
  type,
}) {
  return (
    <li className={style.socialItem}>
      <a href={href}
        title={title}
        className={style.socialLink}
        rel="nofollow"
        target="_blank">
        <Icon type={type} size="m" className={style.socialIcon} />
      </a>
    </li>
  );
}
