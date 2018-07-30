import { Link } from 'react-router-dom'
import Footer from '../Footer'
import Icon from '../Icon'

import flagRu from '../../images/ru.svg'
import flagAu from '../../images/au.svg'
import flagTh from '../../images/th.svg'

import style from './index.css'

export default function BioContent ({ bio }) {
  return (
    <dl className={style.bioList}>
          <dt className={style.bioListHead}>Email</dt>
          <dd className={style.bioListItem}>
            <a href={`mailto:${bio.email}`}>{bio.email}</a>
            <a href={bio.pgp} target="_blank" className={style.bioExternal}>
              <Icon type="key" size="s" />
            </a>
          </dd>
          <dt className={style.bioListHead}>Phone</dt>
          <dd className={style.bioListItem}>
            <img className={style.bioListItemFlag}
              src={flagRu}
              alt="ru"
              width="16"
              height="" />
            <a href={`tel:${bio.phoneRus}`}>{bio.phoneRus}</a>
            <Icon className={style.bioExternal} type="whatsapp" size="s" />
            <Icon className={style.bioExternal} type="viber" size="s" />
            <a className={style.bioExternal} href={bio.telegram} target="_blank">
              <Icon type="telegram" size="s" />
            </a>
          </dd>
          <dd className={style.bioListItem}>
            <img className={style.bioListItemFlag}
              src={flagAu}
              alt="au"
              width="16"
              height="" />
            <a href={`tel:${bio.phoneAus}`}>{bio.phoneAus}</a>
          </dd>
          <dd className={style.bioListItem}>
            <img className={style.bioListItemFlag}
              src={flagTh}
              alt="th"
              width="16"
              height="" />
            <a href={`tel:${bio.phoneThai}`}>{bio.phoneThai}</a>
          </dd>
          <dt className={style.bioListHead}>Skype</dt>
          <dd className={style.bioListItem}>
            <a href={`skype:${bio.skype}?add`}>{bio.skype}</a>
          </dd>
          <dt className={style.bioListHead}>Jabber</dt>
          <dd className={style.bioListItem}>
            <a href={`xmpp:${bio.jabber}?message`}>{bio.jabber}</a>
          </dd>
    </dl>
  );
}
