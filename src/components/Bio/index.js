import Avatar from '../Avatar'
import Social from '../Social'

import style from './index.css'

export default function Bio ({
  bio,
  hasAccess,
}) {

  const socialItems = [
    { href: bio.facebook, title: 'Facebook', type: 'facebook' },
    { href: bio.github, title: 'GitHub', type: 'github' },
    { href: bio.linkedin, title: 'Linkedin', type: 'linkedin' },
  ];

  return (
    <section className={style.bio}>
      <header className={style.bioHead}>
        <Avatar
          size="m"
          src={bio.userpic}
          alt={bio.nickname} />
        <div>
          <h1 className={style.bioName}>{bio.fullname}</h1>
          <p className={style.bioRole}>{bio.role}</p>
        </div>
      </header>
      <footer className={style.bioContent}>
        <dl className={style.bioList}>
          <dt className={style.bioListHead}>Email</dt>
          <dd className={style.bioListItem}>
            <a href={`mailto:${bio.email}`} target="_blank">{bio.email}</a>
          </dd>
          <dt className={style.bioListHead}>Phone</dt>
          <dd className={style.bioListItem}>
            <a href={`tel:${bio.phone}`} target="_blank">{bio.phone}</a>
          </dd>
          <dt className={style.bioListHead}>Skype</dt>
          <dd className={style.bioListItem}>
            <a href={`skype:${bio.skype}?add`} target="_blank">{bio.skype}</a>
          </dd>
          <dt className={style.bioListHead}>ICQ</dt>
          <dd className={style.bioListItem}>
            <a href={`icq:${bio.icq}`} target="_blank">{bio.icq}</a>
          </dd>
        </dl>
        <Social items={socialItems} size="s" circle={false} />
      </footer>
    </section>
  )
}
