import { RouterProvider, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux';
import 'bootstrap';
import 'react-bootstrap';
import { Container, Modal } from 'react-bootstrap';
import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';
import { UserDTO } from '../api/users';
import { C_PROJECT_DATA, getCookie, setCookie } from '../cookies';
import { C_SELECTED_PROJECT_ID } from '../cookies';
import { getProject, getPublicProject, ProjectDTO } from '../api/projects';
import { UserPermissions } from '../models';
import { appContext } from './AppContextProvider';
import { ErrorView } from '../views/ErrorView';
import { authContext } from './AuthContextProvider';
import { parseJsonOrNull } from '../api/constants';
import { constructProjectForm, projectFormToDTO } from '../models/product/ProjectFormState';


  // контекст проекта
  interface ProjectContext {
    project: ProjectDTO|null
    loadProject: (id?: number) => Promise<ProjectDTO|null>
    hasPermission: (permission:UserPermissions)=>boolean
  }
  
  export const projectContext = createContext<ProjectContext>({
    project: null,
    loadProject: async (id?: number) => null,
    hasPermission: (permission:UserPermissions)=>false,
  });

interface ProjectContextProviderProps {
    children: ReactElement
}

function ProjectContextProvider({children}:ProjectContextProviderProps) {
  const [project, setProject] = useState<ProjectDTO|null>(parseJsonOrNull(getCookie(C_PROJECT_DATA)))
  const {showModal} = useContext(appContext)
  const {user} = useContext(authContext)

  const location = useLocation()
  useEffect(()=>{
    setProject(parseJsonOrNull(getCookie(C_PROJECT_DATA)))
  }, [])

  async function loadProject(id?: number) {

    setCookie(C_SELECTED_PROJECT_ID, `${id ?? ''}`, id?10:0)
    if (id === undefined) {
      setProject(null)
      return null
    }
    
    var res: ProjectDTO|null = null
    try{
      res = await (user?getProject:getPublicProject)(id)
      setProject(res ? res : null)
      setCookie(C_PROJECT_DATA,res?JSON.stringify(res):'', res?300:0)
    } catch(e:any){
      setCookie(C_SELECTED_PROJECT_ID,'', 0)
      setCookie(C_PROJECT_DATA, '', 0)
      showModal(<div className='m-2'>{e.message}</div>, <b>{e.name}</b>)
    }
    return res
  }

  const hasPermission = (permission:UserPermissions) => {
    
    const project: ProjectDTO|null = parseJsonOrNull(getCookie(C_PROJECT_DATA))
    const permissions : string[] = project?.role?.permissions.map(p=>p.name) ?? []

    return permissions.find(
      p=>p==permission.valueOf()
    ) != undefined
  }
  
  return (
    <>
      <projectContext.Provider
        value={{
          project: project,
          hasPermission: hasPermission,
          loadProject: loadProject,
        }}
      >
        {children}
      </projectContext.Provider>
    </>
  )
}

export default ProjectContextProvider
