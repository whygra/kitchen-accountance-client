import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Form, Pagination, Row } from 'react-bootstrap';
import { useNavigate, useNavigation } from 'react-router-dom';

interface TagSearchProps {
    label: string
    variant?: string
    items: string[]
    onItemsChanged: (items: string[])=>void
}

const DELIMETER = ' '
function TagSearch({onItemsChanged, items, label, variant}: TagSearchProps) {

    function handleTextChange(text:string){
        
        const newItems = text.trim() ? text.split(DELIMETER).map(i=>i.trim()) : []
        onItemsChanged(newItems) 
    }


    function onKeyDown(e:any) {
        if(items[items.length-1] != '' && (e.keyCode == 13 || e.keyCode == 32))
            handleTextChange(items.join(DELIMETER))
    }
    
    return (
        <Row>
            <Col className='ps-5 position-relative'>
                <div className='pt-2 text-end'>{label}</div>
            </Col>
            <Col><Form.Group className='mt-1 position-relative'>
                <div className='text-end position-absolute start-0 ps-1'>{items.map(i=>
                    <Badge 
                        className={`mt-2 ms-0 me-0 p-1 font-monospace ${variant? 'bg-'+variant : ''}`} 
                        style={{fontSize:'1rem', fontWeight:'normal'}}>{i}
                    </Badge>)}
                </div>
                <Form.Control
                    className='font-monospace text-white'
                    maxLength={28}
                    onKeyDown={e=>onKeyDown(e)}
                    value={items.join(DELIMETER)}
                    onChange={(e)=>handleTextChange(e.target.value)}
                    />

            </Form.Group></Col>
        </Row>
  );
};

export default TagSearch;