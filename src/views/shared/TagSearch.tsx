import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Form, Pagination, Row } from 'react-bootstrap';
import { useNavigate, useNavigation } from 'react-router-dom';

interface TagSearchProps {
    label: string
    items: string[]
    onItemsChanged: (items: string[])=>void
}

function TagSearch({onItemsChanged, items, label}: TagSearchProps) {

    function handleTextChange(text:string){
        const newItems = text.trim() ? text.split(', ').map(i=>i.trim()) : []
        onItemsChanged(newItems) 
    }
    
    return (
        <Row>
            <Col className='ps-5 position-relative'>
                <div className='pt-2 text-end'>{label}</div>
            </Col>
            <Col><Form.Group className='mt-1 position-relative'>
                <div className='text-end position-absolute start-0 ps-2'>{items.map(i=><Badge className='mt-2 ms-0 me-0 p-1' style={{fontSize:'1rem', fontWeight:'normal'}}>{i}</Badge>)}</div>
                <Form.Control
                    value={items.join(', ')}
                    onChange={(e)=>handleTextChange(e.target.value)}
                    />

            </Form.Group></Col>
        </Row>
  );
};

export default TagSearch;