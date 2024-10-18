import React, { useEffect, useState } from 'react';
import { Button, Form, Pagination, Row } from 'react-bootstrap';
import { useNavigate, useNavigation } from 'react-router-dom';

interface PaginationNavProps {
    makeSlice: (pageLength: number, pageNumber:number)=>void
    initPageLength?: number
    totalLength: number
    resetTo?: -1|0|1
}

const PaginationNav = ({ resetTo, makeSlice, totalLength, initPageLength }:PaginationNavProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageLength, setPageLength] = useState(initPageLength??10)
    const [navPages, setNavPages] = useState<number[]>([])
    
    const numPages = totalLength <= 0 ?1 :Math.ceil(totalLength / pageLength);
    useEffect(()=>{
        let page = currentPage
        switch(resetTo){
            case 0:
                page = currentPage > numPages ? numPages : currentPage
                break
            case -1:
                page = numPages
                break
            case 1:
                page = 1
                break;
            default:
                page = currentPage > numPages ? numPages : currentPage
        }
        goToPage(page)
    }, [totalLength])

    function goToPage(pageNumber:number){
        setCurrentPage(pageNumber)
        setNavPages([...Array(7).keys()].map(i => i + pageNumber-3).filter(p=>p>=1&&p<=numPages))
        makeSlice(pageLength, pageNumber)
    }
    
    // если все элементы помещаются на страницу, навигатор не отображаем
    if (pageLength >= totalLength)
        return <></>
    return (
        <Pagination className="justify-content-center">
            <Button
                variant='none'
                onClick={()=>goToPage(1)}
            >Начало</Button>
            {navPages.map(pageNumber=>{
                return pageNumber==currentPage 
                ? <Form.Select style={{width: '5em'}}
                    defaultValue={currentPage}
                    onChange={(e)=>goToPage(parseInt(e.target.value))}
                >
                    {[...Array(numPages).keys()].map(p=>p+1)
                        .map(p=>
                            <option value={p}>{p}</option>
                            )}

                </Form.Select>
                : <Button
                    variant='none'
                    onClick={()=>goToPage(pageNumber)}
                >{pageNumber}</Button>
            })}
            <Button
                variant='none'
                onClick={()=>goToPage(numPages)}
            >Конец</Button>
        </Pagination>
  );
};

export default PaginationNav;