import classnames from 'classnames'
import './inline.css'

enum MODE {
  Spaced = 'spaced',
  Stacked = 'stacked',
}

type ButtonProps = {
  mode: MODE
} & React.HTMLAttributes<HTMLElement>

const Inline = ({ children, className, mode, ...rest }: ButtonProps) => (
  <div
    {...rest}
    className={classnames('ui-inline', `ui-inline-${mode}`, className)}
  >
    {children}
  </div>
)

export { Inline, MODE }
