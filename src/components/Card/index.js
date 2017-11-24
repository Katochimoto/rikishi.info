import Avatar from '../Avatar';
import Social from '../Social';

import style from './index.css';

export default function Card ({
  bio,
  hasAccess,
}) {
  return (
    <section className={style.card}>
      <header>
        <Avatar src={bio.userpic} alt={bio.nickname} />
        <h1>{bio.nickname}</h1>
        <p>{bio.role}</p>
      </header>
      <footer>
        <Social
          hasAccess={hasAccess}
          facebook={bio.facebook}
          github={bio.github}
          linkedin={bio.linkedin} />
      </footer>
    </section>
  );
}
