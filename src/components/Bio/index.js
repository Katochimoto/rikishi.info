import Avatar from '../Avatar'
import Social from '../Social'
import Icon from '../Icon'

import style from './index.css'

export default function Bio ({
  bio,
  hasAccess,
}) {

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
    { href: bio.rss, title: 'RSS', type: 'rss' },
  ];

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

          <a href={bio.cv} className={style.bioPersonal} target="_blank">CV</a>
          <a href={bio.vcard} className={style.bioPersonal} target="_blank">vCard</a>
        </div>
      </header>
      <footer className={style.bioContent}>
        <dl className={style.bioList}>
          <dt className={style.bioListHead}>Email</dt>
          <dd className={style.bioListItem}>
            <a href={`mailto:${bio.email}`}>{bio.email}</a>
            <a href={bio.pgp} target="_blank" className={style.bioExternal}>
              <Icon type="key" size="s" />
            </a>
          </dd>
          <dt className={style.bioListHead}>Phone</dt>
          <dd className={style.bioListItem}>
            <a href={`tel:${bio.phoneAus}`}>{bio.phoneAus}</a>
            <Icon className={style.bioExternal} type="whatsapp" size="s" />
            <Icon className={style.bioExternal} type="viber" size="s" />
          </dd>
          <dt className={style.bioListHead}>Skype</dt>
          <dd className={style.bioListItem}>
            <a href={`skype:${bio.skype}?add`}>{bio.skype}</a>
          </dd>
          <dt className={style.bioListHead}>Jabber</dt>
          <dd className={style.bioListItem}>
            <a href={`xmpp:${bio.jabber}?message`}>{bio.jabber}</a>
          </dd>
        </dl>
        <Social items={socialItems1} size="s" circle={false} />
        <Social items={socialItems2} size="s" circle={false} />
      </footer>
    </section>
  )
}
