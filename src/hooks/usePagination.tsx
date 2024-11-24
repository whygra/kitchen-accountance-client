import { useEffect, useState } from "react"
import { Button, Form, Pagination } from "react-bootstrap"

export default function usePagination(totalLength: number, initPageLength?:number){
    const [currentPage, setCurrentPage] = useState(1)
    const [pageLength, setPageLength] = useState(initPageLength??10)
    const [navPages, setNavPages] = useState<number[]>([])
    
    const numPages = totalLength <= 0 ?1 :Math.ceil(totalLength / pageLength);
    useEffect(()=>{
        const page = currentPage > numPages ? numPages : currentPage
        goToPage(page)
    }, [totalLength])

    function goToPage(pageNumber:number){
        const page = pageNumber > 0 ? pageNumber : numPages
        setCurrentPage(page)
        setNavPages([...Array(7).keys()].map(i => i + page-3).filter(p=>p>=1&&p<=numPages))
        makeSlice(pageLength, page)
    }

    function goToElement(index:number){
        goToPage(Math.ceil((index+1) / pageLength))
    }
    
    // если все элементы помещаются на страницу, навигатор не отображаем
    const nav = (pageLength >= totalLength)
    ? <></>
    : (
        <Pagination className="justify-content-center">
            <Button
                variant='none'
                onClick={()=>goToPage(1)}
            >Начало</Button>
            {navPages.map(pageNumber=>{
                return pageNumber==currentPage 
                ? <Form.Select style={{width: '5em'}}
                    onChange={(e)=>goToPage(parseInt(e.target.value))}
                >
                    {[...Array(numPages).keys()].map(p=>p+1)
                        .map(p=>
                            <option selected={p==currentPage} value={p}>{p}</option>
                        )
                    }

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
  
    // границы среза коллекции, отображаемого на странице
    const [sliceLimits, setSliceLimits] = useState({start:0, end:1})

    // функция назначает границы среза коллекции, вызывается компонентом пагинации
    function makeSlice(pageLength:number, pageNumber:number){
        setSliceLimits({start:pageLength*(pageNumber-1), end:pageLength*pageNumber})
    }

    return {sliceLimits, setSliceLimits, makeSlice, nav, goToPage, goToElement, pageLength, setPageLength, currentPage}
}