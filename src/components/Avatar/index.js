import style from './index.css';

export default function Avatar ({ src, alt }) {
  return (
    <span className={style.avatar}>
      <img src={src} alt={alt} width="150" height="150" />
    </span>
  );
}
