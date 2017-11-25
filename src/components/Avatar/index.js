import classnames from 'classnames'
import style from './index.css'

const SIZES = {
  l: 150,
  m: 100,
  s: 50,
}

export default function Avatar ({
  src,
  alt,
  className,
  size = 'l',
}) {
  const classes = classnames({
    [ style.avatar ]: true,
    [ className ]: Boolean(className),
  })

  return (
    <span className={classes}>
      <img src={src}
        alt={alt}
        width={SIZES[size]}
        height={SIZES[size]} />
    </span>
  )
}
