import {  useParams } from 'react-router-dom'
import 'bootstrap';
import 'react-bootstrap';
import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { postProject, ProjectDTO, putProject, uploadProjectBackdrop, uploadProjectLogo } from '../../../api/nomenclature/projects';
import { constructProjectForm, ProjectFormState, projectFormToDTO } from '../../../models/product/ProjectFormState';
import { constructProductForm } from '../../../models/product/ProductFormState';
import { projectContext } from '../../ProjectContextProvider';
import { DataAction, UserPermissions } from '../../../models';
import { ServerImageData } from '../../../api/constants';
import Loading from '../../../views/shared/Loading';


  // контекст приложения
  interface ProjectFormContext {
    history: {canUndo: boolean, undo: ()=>void}
    formState: ProjectFormState
    backdropFile?: File
    logoFile?: File
    action: DataAction
    resetBackdrop: ()=>void
    resetLogo: ()=>void
    reloadState: ()=>void
    requestFn: ()=>Promise<ProjectDTO|null>
    setName: (name:string)=>void
    setLogo: (file?: File) => void,
    setBackdrop: (file?: File) => void,
  }
  
  export const projectFormContext = createContext<ProjectFormContext>({
    history: {canUndo: false, undo: ()=>{}},
    formState: constructProductForm(),
    backdropFile: undefined,
    logoFile: undefined,
    action: DataAction.None,
    resetBackdrop: ()=>{},
    resetLogo: ()=>{},
    reloadState: ()=>{},
    requestFn: async ()=>null,
    setName: (name:string)=>{},
    setLogo: (file?: File) => {},
    setBackdrop: (file?: File) => {},
  });

interface ProjectFormContextProviderProps {
  action: DataAction
  children: ReactElement
}

function ProjectFormContextProvider({children, action}:ProjectFormContextProviderProps) {
  const {getProject, loadProject: loadProjectState, hasPermission} = useContext(projectContext)
  const [formState, setFormState] = useState(constructProjectForm(getProject()??undefined))
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<ProjectFormState[]>([])
  const [isLoading, setIsLoading] = useState(false) 
  
  const [logoFile, setLogoFile] = useState<File>()
  const [initLogoData, setInitLogoData] = useState<ServerImageData>()
  
  const [backdropFile, setBackdropFile] = useState<File>()
  const [initBackdropData, setInitBackdropData] = useState<ServerImageData>()

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
      await loadProject()
    else
      setFormState(constructProjectForm())
    
    setFormStateHistory([])
    
    setIsLoading(false)
  }

  async function loadProject() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id проекта")

    const project = await loadProjectState(parseInt(id))
    
    if (project === null)
      throw Error("Не удалось получить данные проекта")

    if(!(action==DataAction.Create || hasPermission(UserPermissions.EDIT_PROJECT)))
      throw {name:'403', message:'Нет прав доступа'}

    setFormState(constructProjectForm(project))
    setInitLogoData(project.logo)
    setInitBackdropData(project.backdrop)
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

  function setLogoData(logoData?: ServerImageData){
    setFormState({...formState, logo:logoData})
  }

  function setLogo(logo?:File) {
    setLogoData(logo?{name:logo.name, url:URL.createObjectURL(logo)}:{name:'', url:''})
    setLogoFile(logo)
  }

  function resetLogo(){
    setLogoData(initLogoData)
  }

  function setBackdropData(backdropData?: ServerImageData){
    setFormState({...formState, backdrop:backdropData})
  }

  function setBackdrop(backdrop?:File) {
    setBackdropData(backdrop?{name:backdrop.name, url:URL.createObjectURL(backdrop)}:{name:'', url:''})
    setBackdropFile(backdrop)
  }

  function resetBackdrop(){
    setBackdropData(initBackdropData)
  }

  async function update() {
    let dto = projectFormToDTO(formState)
    const project = await putProject(dto)
    if(project?.id && logoFile){
      const imageData = await uploadProjectLogo(project.id, logoFile)
      if (imageData)
        dto.logo = imageData
    }
    if(project?.id && backdropFile){
      const imageData = await uploadProjectBackdrop(project.id, backdropFile)
      if (imageData)
        dto.backdrop = imageData
    }
    return project
  }

  async function create() {
    let dto = projectFormToDTO(formState)
    const project = await postProject(dto)

    if(project?.id && logoFile){
      const imageData = await uploadProjectLogo(project.id, logoFile)
      if (imageData)
        dto.logo = imageData

    }
    if(project?.id && backdropFile){
      const imageData = await uploadProjectBackdrop(project.id, backdropFile)
      if (imageData)
        dto.backdrop = imageData
    }
    return project
  }
  return (
    <>
      <projectFormContext.Provider
        value={{
          history: {canUndo: history.length>0, undo: undo},
          formState: formState,
          backdropFile: backdropFile,
          logoFile: logoFile,
          action: action,
          resetBackdrop: resetBackdrop,
          resetLogo: resetLogo,
          reloadState: initialize,
          requestFn: action == DataAction.Create ? create : update,
          setName: setName,
          setLogo: setLogo,
          setBackdrop: setBackdrop,
        }}
        >
          {isLoading ? <Loading/> : children}
      </projectFormContext.Provider>
    </>
  )
}

export default ProjectFormContextProvider
