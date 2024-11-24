import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import 'bootstrap';
import 'react-bootstrap';
import { Container, Modal } from 'react-bootstrap';
import { createContext, ReactElement, ReactNode, useEffect, useState } from 'react';
import { UserDTO } from '../api/users';
import { getCookie, setCookie } from '../cookies';
import { C_ACCESS_TOKEN, C_IS_SIGNED_IN, C_PROJECT_PERMISSIONS, C_SELECTED_PROJECT_ID, parseJsonOrNull } from '../api/constants';
import { getProject, ProjectDTO } from '../api/projects';
import { UserPermissions } from '../models';


  // контекст проекта
  interface ProjectContext {
    project: ProjectDTO|null
    selectProject: (project: ProjectDTO|null) => void
    hasPermission: (permission:UserPermissions)=>boolean
  }
  
  export const projectContext = createContext<ProjectContext>({
    project: null,
    selectProject: (project:ProjectDTO|null)=>{},
    hasPermission: (permission:UserPermissions)=>false,
  });

interface ProjectContextProviderProps {
    children: ReactElement
}

function ProjectContextProvider({children}:ProjectContextProviderProps) {
  const [project, setProject] = useState<ProjectDTO|null>(null)
  useEffect(()=>{
    getPermissions()
  }, [])

  function getPermissions() {
    
    const id = getCookie(C_SELECTED_PROJECT_ID)
    if (id == ''){
      setProject(null)
      return
    }
    // if (parseInt(id) !== project?.id)
      getProject(parseInt(id))
        .catch(e=>console.log(e.message))
        .then(res=>{
          setProject(res ? res : null)
          setCookie(C_PROJECT_PERMISSIONS,JSON.stringify(res?.role?.permissions.map(p=>p.name)??''), 1)
        })
  }

  function selectProject(project: ProjectDTO|null){
    setProject(project)
    setCookie(C_SELECTED_PROJECT_ID, `${project?.id ?? ''}`, 10)
    getPermissions()
  }

  const hasPermission = (permission:UserPermissions) => {
    if(getCookie(C_SELECTED_PROJECT_ID) == '') return false
    
    const permissions : string[] = parseJsonOrNull(getCookie(C_PROJECT_PERMISSIONS))
    
    return permissions?.find(
      p=>p==permission.valueOf()
    ) != undefined
  }
  
  return (
    <>
      <projectContext.Provider
        value={{
          project: project,
          hasPermission: hasPermission,
          selectProject: selectProject,
        }}
      >
        {children}
      </projectContext.Provider>
    </>
  )
}

export default ProjectContextProvider
