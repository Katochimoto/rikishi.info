import { Link } from 'react-router-dom'
import classnames from 'classnames'
import Icon from '../Icon'

import style from './index.css'

export default function Social ({
  size = 'm',
  circle = true,
  items = [],
}) {
  return (
    <ul className={style.social}>
      {items.map(item => mapIterate(item, { size, circle }))}
    </ul>
  )
}

function mapIterate ({
  href,
  title,
  type,
}, {
  size,
  circle,
}) {
  const classesLink = classnames({
    [ style.socialLink ]: true,
    [ style.socialLinkCircle ]: Boolean(circle),
  })

  if (href.charAt(0) === '/') {
    return (
      <li key={type} className={style.socialItem}>
        <Link to={href} className={classesLink}>
          <Icon type={type} size={size} />
        </Link>
      </li>
    )
  }

  return (
    <li key={type} className={style.socialItem}>
      <a href={href}
        title={title}
        className={classesLink}
        rel="nofollow"
        target="_blank">
        <Icon type={type} size={size} />
      </a>
    </li>
  )
}
