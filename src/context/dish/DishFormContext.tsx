import { getIngredientsWithProducts, IngredientDTO } from '../../api/ingredients';
import { DataAction } from '../../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useEffect, useState } from 'react';
import { DishIngredientFormState, DishFormState, constructDishForm, constructDishIngredientForm, dishFormToDTO } from '../../models/dish/DishFormState';
import { DishDTO, getDishWithIngredients, postDishWithIngredients, putDishWithIngredients, uploadDishImage } from '../../api/dishes';
import { IngredientTypeDTO, getIngredientTypes } from '../../api/ingredientTypes';
import DishForm from '../../views/dish/form/DishForm';
import { DishCategoryDTO, getDishCategories } from '../../api/dishCategories';
import { Image } from 'react-bootstrap';
import Loading from '../../views/shared/Loading';
import { ServerImageData } from '../../api/constants';
import { DishGroupDTO, getDishGroups } from '../../api/dishGroups';


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
  requestFn: ()=>Promise<DishDTO|null>
  setName: (name:string)=>void
  setCategoryName: (name:string)=>void
  setCategoryId: (id:number)=>void
  setCategoryDataAction: (action:DataAction)=>void
  setGroupName: (name:string)=>void
  setGroupId: (id:number)=>void
  setGroupDataAction: (action:DataAction)=>void
  setImage: (file?: File) => void,
  categories:DishCategoryDTO[]
  groups:DishGroupDTO[]
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
  requestFn:async()=>null,
  setName:(name:string)=>{},
  setCategoryName: (name:string)=>{},
  setCategoryId: (id:number)=>{},
  setCategoryDataAction: (action:DataAction)=>{},
  setGroupName: (name:string)=>{},
  setGroupId: (id:number)=>{},
  setGroupDataAction: (action:DataAction)=>{},
  setImage: (file?: File) => {},
  categories:[],
  groups:[],
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
  const [categories, setCategories]= useState<DishCategoryDTO[]>([])
  const [groups, setGroups]= useState<DishGroupDTO[]>([])
  const [imageFile, setImageFile] = useState<File>()
  const [initImageData, setInitImageData] = useState<ServerImageData>()

  const {id} = useParams()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание блюда'
      :`Редактирование блюда "${formState.id}. ${formState.name}"`
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
    setIngredients(await getIngredientsWithProducts()??[])
    setCategories([{id:0, name:'без категории'}, ...(await getDishCategories()??[])])
    setGroups([{id:0, name:'без группы'}, ...(await getDishGroups()??[])])
    
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
    console.log(name)
    saveToHistory()
    setFormState({...formState, name:name})
  }

  function setCategoryId(categoryId: number) {
    saveToHistory()
    setFormState({...formState, categoryId:categoryId})
  }

  function setCategoryName(categoryName: string) {
    saveToHistory()
    setFormState({...formState, categoryName:categoryName})
  }

  function setCategoryDataAction(dataAction: DataAction) {
    saveToHistory()
    setFormState({...formState, categoryDataAction:dataAction})
  }

  function setGroupId(groupId: number) {
    saveToHistory()
    setFormState({...formState, groupId:groupId})
  }

  function setGroupName(groupName: string) {
    saveToHistory()
    setFormState({...formState, groupName:groupName})
  }

  function setGroupDataAction(dataAction: DataAction) {
    saveToHistory()
    setFormState({...formState, groupDataAction:dataAction})
  }

  function addDishIngredientForm(ingredient?: IngredientDTO) {
    saveToHistory()
    setFormState({
      ...formState, 
      dishIngredientForms:
        [
          ...formState.dishIngredientForms,
          constructDishIngredientForm(ingredient?{...ingredient, waste_percentage:0, ingredient_amount:1}:undefined)
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
    const dish = await putDishWithIngredients(dto)
    if(dish?.id && imageFile){
      const imageData = await uploadDishImage(dish.id, imageFile)
      if (imageData)
        dto.image = imageData
    }
    return await postDishWithIngredients(dto)
  }
  
  return isLoading ? (<Loading/>) : (
    <dishFormContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      ingredients: ingredients,
      ingredientTypes: ingredientTypes,
      categories: categories,
      groups: groups,
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
      setCategoryDataAction: setCategoryDataAction,
      setCategoryId: setCategoryId,
      setCategoryName: setCategoryName,
      setGroupDataAction: setGroupDataAction,
      setGroupId: setGroupId,
      setGroupName: setGroupName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </dishFormContext.Provider>
  )
}

export default DishFormContextProvider