import React from 'react'
import './list.css'

type ListProps = React.HTMLAttributes<HTMLUListElement>

const List = ({ children, ...rest }: ListProps) => (
  <ul {...rest} className="ui-list">
    {children}
  </ul>
)

type ListItemProps = React.HTMLAttributes<HTMLLIElement>

const ListItem = ({ children, ...rest }: ListItemProps) => (
  <li {...rest}>
    <div className="ui-list-item">{children}</div>
  </li>
)

export { List, ListItem }
