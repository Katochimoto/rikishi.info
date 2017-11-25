import Avatar from '../Avatar'
import Social from '../Social'

import style from './index.css'

export default function Bio ({
  bio,
  hasAccess,
}) {
  return (
    <section className={style.bio}>
      <header>
        <Avatar
          src={bio.userpic}
          alt={bio.nickname} />

        <h1>{bio.fullname}</h1>
        <p>{bio.role}</p>
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
      </footer>
    </section>
  )
}
