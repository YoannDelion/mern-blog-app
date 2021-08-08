import { memo, ChangeEventHandler } from 'react'
import './textInput.scss'

export default memo(function TextInput({
  name,
  placeholder,
  value,
  onChange,
  label,
  type = 'text'
}: PropsTypes) {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className="loginInput"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder || name}
        onChange={onChange}
        value={value}
      />
    </>
  )
})

type PropsTypes = {
  name: string,
  placeholder?: string,
  value: string,
  onChange: ChangeEventHandler,
  label?: string,
  type?: 'text' | 'password'
}