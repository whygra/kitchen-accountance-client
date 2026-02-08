import { FormEvent, useState } from 'react'
import {Button, Col, Form, FormControlProps, Row} from 'react-bootstrap'
import TagBadge from './TagBadge'

const MIN_TAG_LENGHT = 4
const MAX_TAG_LENGHT = 12

interface TagInputProps {
  selectedTags: string[]
  tags: string[]
  selectTag: (tag: string)=>void
  unselectTag: (tag: string)=>void
}

function TagInput({
  selectedTags,
  tags,
  selectTag,
  unselectTag
}: TagInputProps) 
{
  const [inputText, setInputText] = useState('')

  function pushTag() {
    if(inputText.length >= MIN_TAG_LENGHT && selectedTags.find(t=>t.toLocaleLowerCase()==inputText.toLocaleLowerCase()) == undefined) {
      selectTag(inputText.toLocaleLowerCase())
      setInputText('')
    }
  }

  const handleKeyDown = (event:any) => {
    if (event.key == 'Enter'){
      event.preventDefault()
      pushTag()
    }
  }

  const suggestedTags = tags
    .filter(t=>selectedTags.indexOf(t) == -1)
    .filter(t=>inputText=='' || t.toLocaleLowerCase().includes(inputText.toLocaleLowerCase()))
    .slice(0, 5)

  return (
    <Form>
    <div className='d-flex flex-row flex-wrap mb-1'>{selectedTags.map(t=>
      <TagBadge variant='danger' tag={t} 
        onClick={()=>unselectTag(t)}
        xOnClick={()=>unselectTag(t)}/>
      )}</div>
    <div className='d-flex flex-row mb-1'>
      <Form.Control
        placeholder='теги'
        maxLength={MAX_TAG_LENGHT}
        onKeyDown={handleKeyDown}
        value={inputText}
        onChange={e=>setInputText(e.target.value)}
      />
      <Button className='ms-1' variant='secondary' onClick={pushTag}>+</Button>
    </div>
    <div className='d-flex flex-row flex-wrap'>{suggestedTags.map(t=><TagBadge tag={t} onClick={()=>selectTag(t)}/>)}</div>

    </Form>
  )
}

export default TagInput;