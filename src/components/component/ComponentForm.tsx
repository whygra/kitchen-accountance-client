import ComponentProductFormList from './ComponentProductFormList';
import NameInput from './ComponentNameInput';
import ComponentTypeSelect from './ComponentTypeSelect';
import { useDispatch, useSelector } from 'react-redux';
import { setComponentName, setComponentTypeId, setProductIdByFormKey } from '../../redux/actions/comoponentFormActions';
import { Dispatch } from 'redux';
import { AppState } from '../../redux/store';
import { postComponent, putComponent } from '../../api/components';
import { postProduct } from '../../api/products';
import { deleteComponentProduct, postComponentProduct } from '../../api/componentProducts';
import { Button } from 'react-bootstrap';


function ComponentForm() 
{  
  const formState = useSelector((state: AppState) => state.componentFormState);

  const dispatch: Dispatch<any> = useDispatch()
  
  function setTypeId(id: number) {
    dispatch(setComponentTypeId(id))
  }

  function setName(name: string) {
    dispatch(setComponentName(name))
  }

  async function commit() {
    // создание новых продуктов
    // для всех форм компонент-продукт
    for(const state of formState.componentProductForms) {
        // создать новый продукт, если нужно
        if(state.isCreateProduct){
            // передача данных продукта серверу
            await postProduct({
                name: state.newProductName,
            })
            // обработка ошибки
            .catch(reason => {})
            // передать id созданного продукта в состояние
            .then((data)=>{setProductIdByFormKey(state.key, data?.id ?? 0)})
        }
    }
    // удаление помеченных связей компонент-продукт
    // для всех форм компонент-продукт
    for(const state of formState.componentProductForms) {
        // удалить существующую связь компонент-продукт, если нужно
        if(state.isMarkedForDelete){
            await deleteComponentProduct(state.id)
        }
    }

    // если компонент новый - создать
    if(formState.isNew)
        postComponent({
            name: formState.name,
            type_id: formState.componentTypeId
        })

    // иначе - обновить
    else{

        putComponent({
            id: formState.id,
            name: formState.name,
            type_id: formState.componentTypeId
        })
    }
        
    // создание связей компонент-продукт
    // для всех форм компонент-продукт
    for(const state of formState.componentProductForms) {
        // если элемент компонент-продукт новый (id==0)
        if(state.id == 0){
            // создать связь компонент-продукт
            await postComponentProduct({
                component_id: formState.id,
                product_id: state.productId,
                content_percentage: state.contentPercentage,
                waste_percentage: state.wastePercentage
            })
        }
    }   
  }

  return (
    <>
      <NameInput
        name={formState.name}
        handleNameChange={setName}
      />
      <ComponentTypeSelect
        componentTypeId={formState.componentTypeId}
        handleComponentTypeChange={setTypeId}
      />
      <ComponentProductFormList/>
      <Button onClick={commit}>Подтвердить</Button>
    </>
  )
}

export default ComponentForm;