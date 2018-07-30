import {
  Link,
  Route,
  Switch,
} from 'react-router-dom'
import classnames from 'classnames'

import PrivateRoute from '../../containers/PrivateRoute'

import Avatar from '../Avatar'
import Social from '../Social'
import Icon from '../Icon'
import BioContent from '../BioContent'
import Qr from '../Qr'

import style from './index.css'

export default function Bio (props) {
  const {
    bio,
    match,
  } = props;

  const socialItems1 = [
    { href: bio.github, title: 'GitHub', type: 'github' },
    { href: bio.npmjs, title: 'npm', type: 'npm' },
    { href: bio.upwork, title: 'Upwork', type: 'upwork' },
    { href: bio.linkedin, title: 'Linkedin', type: 'linkedin' },
    { href: bio.paypal, title: 'Paypal', type: 'paypal' },
    { href: bio.facebook, title: 'Facebook', type: 'facebook' },
    { href: bio.instagram, title: 'Instagram', type: 'instagram' },
  ];

  const socialItems2 = [
    { href: bio.pinterest, title: 'Pinterest', type: 'pinterest' },
    { href: bio.twitter, title: 'Twitter', type: 'twitter' },
    { href: bio.google, title: 'Google+', type: 'google-plus' },
    { href: `icq:${bio.icq}`, type: 'icq', title: 'ICQ', target: null },
    { href: bio.telegram, title: 'Telegram', type: 'telegram' },
    { href: bio.rss, title: 'RSS', type: 'rss' },
  ];

  const classesQrLink = classnames({
    [ style.bioPersonal ]: true,
    [ style.bioPersonalQr ]: true,
  })

  return (
    <section className={style.bio}>
      <header className={style.bioHead}>
        <Avatar
          size="m"
          src={bio.userpic}
          alt={bio.nickname} />
        <div className={style.bioAbout}>
          <h1 className={style.bioName}>{bio.fullname}</h1>
          <p className={style.bioRole}>{bio.role}</p>

          <Switch>
            <Route path={`${match.path}/qr`} render={() => (
              <Link to="/bio" className={classesQrLink}>
                <Icon type="v-card" size="s" />
              </Link>
            )} />
            <Route path={match.path} render={() => (
              <Link to="/bio/qr" className={classesQrLink}>
                <Icon type="qr" size="s" />
              </Link>
            )} />
          </Switch>

          <a href={bio.cv} className={style.bioPersonal} target="_blank">CV</a>
          <a href={bio.vcard} className={style.bioPersonal} target="_blank">vCard</a>
        </div>
      </header>
      <footer className={style.bioContent}>
        <Switch>
          <Route path={`${match.path}/qr`} render={(props) => <Qr {...props} bio={bio} />} />
          <Route path={match.path} render={(props) => <BioContent {...props} bio={bio} />} />
        </Switch>

        <Social items={socialItems1} size="s" circle={false} />
        <Social items={socialItems2} size="s" circle={false} />
      </footer>
    </section>
  )
}
