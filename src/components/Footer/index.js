import style from './index.css';


export default function Footer () {
  return (
    <footer className={style.footer}>
      <ul className={style.copyright}>
        <li className={style.copyrightItem}>&copy; Anton Tursenev</li>
        <li className={style.copyrightItem}>Design: <a href="http://html5up.net">HTML5 UP</a></li>
      </ul>
    </footer>
  );
}
