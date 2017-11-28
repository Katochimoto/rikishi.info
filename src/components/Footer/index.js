import style from './index.css';


export default function Footer () {
  return (
    <footer className={style.footer}>
      <ul className={style.copyright}>
        <li className={style.copyrightItem}>
          &copy; Rikishi
        </li>
        <li className={style.copyrightItem}>
          Design:
          <a href="https://html5up.net/identity"
            rel="noopener"
            target="_blank">HTML5 UP</a>
        </li>
      </ul>
    </footer>
  );
}
