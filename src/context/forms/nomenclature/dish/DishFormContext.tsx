import { getIngredients, getIngredientsWithProducts, IngredientDTO } from '../../../../api/nomenclature/ingredients';
import { DataAction } from '../../../../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useEffect, useState } from 'react';
import { DishIngredientFormState, DishFormState, constructDishForm, constructDishIngredientForm, dishFormToDTO } from '../../../../models/dish/DishFormState';
import { DishDTO, getDishWithIngredients, postDishWithIngredients, putDishWithIngredients, uploadDishImage } from '../../../../api/nomenclature/dishes';
import { IngredientTypeDTO, getIngredientTypes } from '../../../../api/nomenclature/ingredientTypes';
import DishForm from '../../../../views/dish/form/DishForm';
import { Image } from 'react-bootstrap';
import Loading from '../../../../views/shared/Loading';
import { ServerImageData } from '../../../../api/constants';
import { DishTagDTO, getDishTags } from '../../../../api/nomenclature/dishTags';


// контекст формы блюда
interface DishFormContext {
  history: {canUndo: boolean, undo: ()=>void}
  image?: File
  resetImage: ()=>void
  reloadState: ()=>void
  addDishIngredientForm: (ingredient?: IngredientDTO)=>void
  setDishIngredientFormState: (state:DishIngredientFormState)=>void
  removeDishIngredientForm: (key:string)=>void
  removeAllDishIngredientForms: ()=>void
  addTag: (tag: string)=>void
  removeTag: (tag: string)=>void
  removeAllTags: ()=>void
  requestFn: ()=>Promise<DishDTO|null>
  setName: (name:string)=>void
  setDescription: (description:string)=>void
  setImage: (file?: File) => void,
  tags:DishTagDTO[]
  formState: DishFormState
  ingredientTypes:IngredientTypeDTO[]
  ingredients:IngredientDTO[]
}

export const dishFormContext = createContext<DishFormContext>({
  history: {canUndo: false, undo: ()=>{}},
  resetImage: ()=>{},
  reloadState: ()=>{},
  addDishIngredientForm:(ingredient?: IngredientDTO)=>{},
  setDishIngredientFormState:(state:DishIngredientFormState)=>{},
  removeDishIngredientForm:(key:string)=>{},
  removeAllDishIngredientForms: ()=>{},
  addTag:(tag: string)=>{},
  removeTag: (tag: string)=>{},
  removeAllTags: ()=>{},
  requestFn:async()=>null,
  setName:(name:string)=>{},
  setDescription:(description:string)=>{},
  setImage: (file?: File) => {},
  tags:[],
  formState: constructDishForm(),
  ingredientTypes:[],
  ingredients:[]
});

interface DishFormContextProviderProps{
  action: DataAction,
  children: ReactElement,
}

function DishFormContextProvider({action, children}:DishFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<DishFormState>(constructDishForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<DishFormState[]>([])
  const [isLoading, setIsLoading] = useState(false) 
  const [ingredientTypes, setIngredientTypes] = useState<IngredientTypeDTO[]>([])
  const [ingredients, setIngredients]= useState<IngredientDTO[]>([])
  const [tags, setTags]= useState<DishTagDTO[]>([])
  const [imageFile, setImageFile] = useState<File>()
  const [initImageData, setInitImageData] = useState<ServerImageData>()

  const {id} = useParams()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание блюда'
      :`Редактирование блюда "${formState.name}"`
  }, [formState])
  
  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      loadDish()
    else
      setFormState(constructDishForm())

    setFormStateHistory([])
    
    setIngredientTypes(await getIngredientTypes()??[])
    setIngredients(await getIngredients()??[])
    setTags(await getDishTags()??[])
    
    setIsLoading(false)
  }

  async function loadDish() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id блюда")

    const dish = await getDishWithIngredients(parseInt(id))

    if (dish === null)
      throw Error("Не удалось получить данные блюда")
    setFormState(constructDishForm(dish))
    setInitImageData(dish.image)
  }

  function saveToHistory(){
    setFormStateHistory([formState, ...formStateHistory].slice(0,historyLength))
  }

  function undo(){
    setFormState(formStateHistory[0])
    setFormStateHistory(formStateHistory.slice(1,formStateHistory.length))
  }

  function setName(name: string) {
    saveToHistory()
    setFormState({...formState, name:name})
  }

  function setDescription(description: string) {
    saveToHistory()
    setFormState({...formState, description:description})
  }

  function addDishIngredientForm(ingredient?: IngredientDTO) {
    saveToHistory()
    setFormState({
      ...formState, 
      dishIngredientForms:
        [
          ...formState.dishIngredientForms,
          constructDishIngredientForm(ingredient?{...ingredient, waste_percentage:0, amount:1}:undefined)
        ]})
  }

  function setDishIngredientFormState(state:DishIngredientFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      dishIngredientForms: formState.dishIngredientForms
      .map(s=>s.key == state.key ? state : s)
    })
  }

  function removeDishIngredientForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      dishIngredientForms: 
        formState.dishIngredientForms
        .filter((s)=>s.key!=key)
    })
  }

  function removeAllDishIngredientForms(){
    saveToHistory()
    setFormState({
      ...formState,
      dishIngredientForms: []
    })
  }

  function addTag(tag: string) {
    saveToHistory()
    setFormState({
      ...formState, 
      tags:
        [
          ...formState.tags,
          tags.find(t=>t.name==tag) ?? {id:0, name:tag}
        ]})
  }

  function removeTag(tag:string){
    saveToHistory()
    setFormState({
      ...formState,
      tags: 
        formState.tags
        .filter((s)=>s.name!=tag)
    })
  }

  function removeAllTags(){
    saveToHistory()
    setFormState({
      ...formState,
      tags: []
    })
  }

  function setImageData(imageData?: ServerImageData){
    setFormState({...formState, image:imageData})
  }

  function setImage(image?:File) {
    setImageData(image?{name:image.name, url:URL.createObjectURL(image)}:{name:'', url:''})
    setImageFile(image)
  }

  function resetImage(){
    setImageData(initImageData)
  }

  async function update() {
    let dto = dishFormToDTO(formState)
    const dish = await putDishWithIngredients(dto)
    if(dish?.id && imageFile){
      const imageData = await uploadDishImage(dish.id, imageFile)
      if (imageData)
        dto.image = imageData
    }
    return dish
  }

  async function create() {
    let dto = dishFormToDTO(formState)
    const dish = await postDishWithIngredients(dto)
    if(dish?.id && imageFile){
      const imageData = await uploadDishImage(dish.id, imageFile)
      if (imageData)
        dish.image = imageData
    }
    return dish
  }
  
  return isLoading ? (<Loading/>) : (
    <dishFormContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      ingredients: ingredients,
      ingredientTypes: ingredientTypes,
      tags: tags,
      formState: formState,
      image: imageFile,
      resetImage: resetImage,
      setImage: setImage,
      reloadState: initialize,
      addDishIngredientForm: addDishIngredientForm,
      setDishIngredientFormState: setDishIngredientFormState,
      removeDishIngredientForm: removeDishIngredientForm,
      removeAllDishIngredientForms: removeAllDishIngredientForms,
      setName: setName,
      setDescription: setDescription,
      addTag: addTag,
      removeTag: removeTag,
      removeAllTags: removeAllTags,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </dishFormContext.Provider>
  )
}

export default DishFormContextProvider