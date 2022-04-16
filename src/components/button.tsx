import React from 'react'
import './button.css'

type ButtonProps = React.HTMLAttributes<HTMLButtonElement>

const Button = ({ children, ...rest }: ButtonProps) => (
  <button {...rest} className="ui-button">
    {children}
  </button>
)

export { Button }
