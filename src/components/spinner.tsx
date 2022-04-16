import classnames from 'classnames'
import './spinner.css'

type SpinnerProps = React.HTMLAttributes<HTMLElement>

const Spinner = ({ className, ...rest }: SpinnerProps) => {
  return (
    <div className={classnames('ui-spinner', className)} {...rest}>
      <div className="ui-spinner-bar-01" />
      <div className="ui-spinner-bar-02" />
      <div className="ui-spinner-bar-03" />
      <div className="ui-spinner-bar-04" />
      <div className="ui-spinner-bar-05" />
      <div className="ui-spinner-bar-06" />
      <div className="ui-spinner-bar-07" />
      <div className="ui-spinner-bar-08" />
      <div className="ui-spinner-bar-09" />
      <div className="ui-spinner-bar-10" />
      <div className="ui-spinner-bar-11" />
      <div className="ui-spinner-bar-12" />
    </div>
  )
}

export { Spinner }
