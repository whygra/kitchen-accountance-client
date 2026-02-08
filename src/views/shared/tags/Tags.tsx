import { FormEvent, useState } from 'react'
import {Button, Col, Form, FormControlProps, Row} from 'react-bootstrap'
import TagBadge from './TagBadge'
import { Link } from 'react-router-dom'

const MIN_TAG_LENGHT = 4
const MAX_TAG_LENGHT = 12

interface TagsProps {
  tags: {name:string, link:string}[]
}

function Tags({
  tags,
}: TagsProps) 
{
  return (
    <Form>
    <div>{tags.map(t=><Link to={t.link}><TagBadge tag={t.name}/></Link>)}</div>
    </Form>
  )
}

export default Tags;