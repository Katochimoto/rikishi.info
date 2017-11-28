import Avatar from '../Avatar'
import Social from '../Social'

import style from './index.css'

export default function Card ({
  bio,
  hasAccess,
}) {
  let socialItems = []

  if (hasAccess) {
    socialItems = [
      { href: `skype:${bio.skype}`, type: 'skype', title: 'Call by Skype', target: null },
      { href: `tel:${bio.phone}`, type: 'phone', title: 'Call by phone', target: null },
      { href: '/bio', type: 'v-card', title: 'Extended info' },
    ]
  } else {
    socialItems = [
      { href: bio.facebook, title: 'Facebook', type: 'facebook' },
      { href: bio.github, title: 'GitHub', type: 'github' },
      { href: bio.linkedin, title: 'Linkedin', type: 'linkedin' },
    ]
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
