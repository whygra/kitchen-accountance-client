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
            <Col sm={4} className='position-relative'>
                <div className='pt-2 text-start text-sm-end'>{label}</div>
            </Col>
            <Col sm={8}>
            <Form.Group className='mt-1 position-relative'>
                
                <Form.Control
                    className='font-monospace'
                    onKeyDown={e=>onKeyDown(e)}
                    value={items.join(DELIMETER)}
                    onChange={(e)=>handleTextChange(e.target.value)}
                    />

            </Form.Group>
            </Col>
            <Col>
                <div className='ps-1'>{items.map(i=>
                    <Badge 
                        className={`mt-2 ms-0 me-0 p-1 font-monospace ${variant? 'bg-'+variant : ''}`} 
                        style={{fontSize:'1rem', fontWeight:'normal'}}>{i.length>20 ? `${i.substring(0,17)}...` : i}
                    </Badge>)}
                </div>
            </Col>
        </Row>
  );
};

export default TagSearch;