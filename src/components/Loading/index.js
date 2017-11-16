import Icon from '../Icon';
import style from './index.css';

export default function Loading () {
  return (
    <div className={style.loading}>
      <Icon type="loader" size="xxl" className={style.loadingIcon} />
    </div>
  );
}
