import classnames from 'classnames'
import style from './index.css'

export default function Icon ({
  className,
  color,
  size = 's',
  type,
} = {}) {
  const typeClass = `icon-${type}`
  const sizeClass = `icon_size_${size}`
  const classes = classnames({
    [ style.icon ]: true,
    [ style[ typeClass ] ]: Boolean(style[ typeClass ]),
    [ style[ sizeClass ] ]: Boolean(style[ sizeClass ]),
    [ className ]: Boolean(className)
  })

  const cssStyle = {}

  if (color) {
    cssStyle.color = color
  }

  return (
    <svg xmlns="https://www.w3.org/2000/svg" className={classes} style={cssStyle}>
      <use href={`#icon-${type}`}></use>
      <rect height="100%" width="100%" style={{ fill: 'transparent' }}></rect>
    </svg>
  )
}
