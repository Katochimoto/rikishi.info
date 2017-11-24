import Avatar from '../Avatar';
import Social from '../Social';

import style from './index.css';

export default function Card ({
  facebook,
  github,
  hasAccess,
  linkedin,
  nickname,
  role,
  userpic,
}) {


  return (
    <section className={style.card}>
      <header>
        <Avatar src={userpic} alt={nickname} />
        <h1>{nickname}</h1>
        <p>{role}</p>
      </header>
      <footer>
        <Social
          hasAccess={hasAccess}
          facebook={facebook}
          github={github}
          linkedin={linkedin} />
      </footer>
    </section>
  );
}
