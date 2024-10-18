import { Button } from "react-bootstrap"

interface HeaderSortButtonProps<FieldType> {
    onClick: (field:FieldType)=>void
    activeField: FieldType
    sortIsDesc: boolean
    header: string
    field: FieldType
}

function HeaderSortButton<T>({
    onClick,
    activeField,
    sortIsDesc,
    header,
    field,
}:HeaderSortButtonProps<T>) {
    const isActive = activeField==field
    return (
        <Button
            variant='none'
            onClick={()=>onClick(field)}
            className={`w-100 h-100 position-relative ${isActive?' bg-light bg-gradient':''}`}
        >
            <b>{header}</b>
            <i className={`position-absolute top-0 end-0 bi 
                ${isActive
                    ? sortIsDesc
                    ? "bi-sort-up"
                    : "bi-sort-down"
                    : "bi-filter-left"}    
            `}/>
        </Button>
    )
}

export default HeaderSortButton