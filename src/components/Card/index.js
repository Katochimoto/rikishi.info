import Avatar from '../Avatar'
import Social from '../Social'

import style from './index.css'

export default function Card ({
  bio,
  hasAccess,
}) {
  const socialItems = [
    { href: bio.facebook, title: 'Facebook', type: 'facebook' },
    { href: bio.github, title: 'GitHub', type: 'github' },
    { href: bio.linkedin, title: 'Linkedin', type: 'linkedin' },
  ]

  if (hasAccess) {
    socialItems.push({ href: '/bio', type: 'v-card' })
  }

  return (
    <section className={style.card}>
      <header>
        <Avatar
          className={style.cardAvatar}
          src={bio.userpic}
          alt={bio.nickname} />
        <h1>{bio.nickname}</h1>
        <p>{bio.role}</p>
      </header>
      <footer>
        <Social items={socialItems} />
      </footer>
    </section>
  )
}
