import { useEffect, useState } from "react"
import { Button, Form, Pagination } from "react-bootstrap"
import { useMediaQuery } from "react-responsive"

export default function usePagination(totalLength: number, initPageLength?:number){
    const [currentPage, setCurrentPage] = useState(1)
    const [pageLength, setPageLength] = useState(initPageLength??10)
    const [navPages, setNavPages] = useState<number[]>([])
    const isSm = useMediaQuery({maxWidth: 767})
    
    const numPages = totalLength <= 0 ?1 :Math.ceil(totalLength / pageLength);
    useEffect(()=>{
        const page = currentPage > numPages ? numPages : currentPage
        goToPage(page)
    }, [totalLength])

    function goToPage(pageNumber:number){
        const page = pageNumber > 0 ? pageNumber : numPages
        setCurrentPage(page)
        setNavPages([...Array(isSm?3:5).keys()].map(i => i + page-(isSm?1:2)).filter(p=>p>=1&&p<=numPages))
        makeSlice(pageLength, page)
    }

    function goToElement(index:number){
        goToPage(Math.ceil((index+1) / pageLength))
    }
    
    // если все элементы помещаются на страницу, навигатор не отображаем
    const nav = (pageLength >= totalLength)
    ? <></>
    : (
        <Pagination className="pt-3 justify-content-center w-100">
            <Button
                className="px-1"
                variant='none'
                onClick={()=>goToPage(1)}
            >Начало</Button>
            {navPages.map(pageNumber=>{
                return pageNumber==currentPage 
                ? <Form.Select 
                    className='pe-2'
                    style={{width: '3.7em'}}
                    onChange={(e)=>goToPage(parseInt(e.target.value))}
                >
                    {[...Array(numPages).keys()].map(p=>p+1)
                        .map(p=>
                            <option selected={p==currentPage} value={p}>{p}</option>
                        )
                    }

                </Form.Select>
                : <Button
                    className="px-3"
                    variant='none'
                    onClick={()=>goToPage(pageNumber)}
                >{pageNumber}</Button>
            })}
            <Button
                className="px-1"
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