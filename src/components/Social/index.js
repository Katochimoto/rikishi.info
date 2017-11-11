import style from './index.css';

export default function Social () {
  return (
    <ul className={style.social}>
      <li className={style.socialItem}>
        <a href="#" className={style.socialLink}>Twitter</a>
      </li>
      <li className={style.socialItem}>
        <a href="#" className={style.socialLink}>Instagram</a>
      </li>
      <li className={style.socialItem}>
        <a href="#" className={style.socialLink}>Facebook</a>
      </li>
    </ul>
  );
}
