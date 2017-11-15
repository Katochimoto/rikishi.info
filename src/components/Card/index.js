import Avatar from '../Avatar';
import Social from '../Social';

import style from './index.css';

export default function Card () {
  return (
    <section className={style.card}>
      <header>
        <Avatar />
        <h1>Rikishi</h1>
        <p>Web Developer</p>
      </header>
      <footer>
        <Social />
      </footer>
    </section>
  );
}
