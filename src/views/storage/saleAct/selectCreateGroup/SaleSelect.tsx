import { ReactElement, useEffect, useState } from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import { DishDTO } from '../../../../api/nomenclature/dishes';
import TableSelect from '../../../shared/selectCreateGroup/TableSelect';
import ModalWrapper from '../../../shared/ModalWrapper';
import ItemsTableItem from '../list/SaleActTableItem';
import DishesTableItem from '../../../dish/list/DishesTableItem';

interface ItemSelectProps {
  header: ReactElement
  itemId : number
  setItemId : (id : number) => void
  items : DishDTO[]
  predicate : (i:DishDTO)=>boolean
  comparer : (i1:DishDTO, i2:DishDTO)=>number
}

function ItemSelect({header, itemId, setItemId, items, predicate, comparer} : ItemSelectProps) {
  const[displayTable, setDisplayTable] = useState(false)

  const selected = items.find(i => i.id == itemId)!
  const filtered = items
    .filter(predicate)
    .sort(comparer)
  
  return (
    <>
    <Button
      variant='none'
      onClick={()=>setDisplayTable(true)}
      >
      {selected.id} {selected.name}
    </Button>
      <ModalWrapper show={displayTable} onHide={()=>setDisplayTable(false)}>
        <TableSelect
          constructRow={i=><DishesTableItem dish={i}/>}
          header={header}
          items={filtered}
          selectedId={itemId}
          setId={setItemId}
        />
      </ModalWrapper>
    </>
  )
}

export default ItemSelect;