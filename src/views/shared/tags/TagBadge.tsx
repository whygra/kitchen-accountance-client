import { FormEvent, useState } from 'react'
import {Badge, Button, Col, Form, FormControlProps, Row} from 'react-bootstrap'

interface TagBadgeProps {
    variant?: 'primary'|'secondary'|'danger'|'warning'|'info'
    tag: string
    onClick?: ()=>void
    xOnClick?: ()=>void
}

function TagBadge({
  tag,
  variant,
  onClick,
  xOnClick
}: TagBadgeProps) 
{
  return (
    <Badge className={`bg-${variant} me-1`} style={{cursor:'pointer'}} onClick={()=>(onClick?onClick():{})}>
        {tag}
        {xOnClick!=undefined
            ? <small className='bi bi-x' onClick={()=>xOnClick()}></small>
            : <></>
        }
    </Badge>
  )
}

export default TagBadge;