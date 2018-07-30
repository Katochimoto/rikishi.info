import { Link } from 'react-router-dom'
import Footer from '../Footer'

import style from './index.css'

export default function Qr ({ bio }) {
  return (
    <img src={bio.qr} alt="QR" className={style.qr} />
  );
}
