import style from './index.css';

export default function Avatar () {
  return (
    <span className={style.avatar}>
      <img src="../../images/avatar.jpg" alt="" width="150" height="150" />
    </span>
  );
}
