import './button.scss'

export default function Button({
  children,
  color = 'primary',
  disabled,
  type,
  style,
  classes
}: PropsTypes) {
  return (
    <button
      className={`button ${color} ${classes}`}
      disabled={disabled}
      type={type}
      style={style}
    >
      {children}
    </button>
  )
}

type PropsTypes = {
  children: any,
  color: 'primary' | 'secondary',
  disabled?: boolean,
  type?: 'submit' | 'reset',
  style?: object
  classes?: string
}