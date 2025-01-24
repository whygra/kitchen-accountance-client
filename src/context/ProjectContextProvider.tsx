import 'bootstrap';
import 'react-bootstrap';
import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';
import { C_PROJECT_DATA, getCookie, setCookie } from '../cookies';
import { C_SELECTED_PROJECT_ID } from '../cookies';
import { getProject, getPublicProject, ProjectDTO } from '../api/projects';
import { UserPermissions } from '../models';
import { authContext } from './AuthContextProvider';
import { parseJsonOrNull } from '../api/constants';


// контекст проекта
interface ProjectContext {
  getProject: () => ProjectDTO|null
  project: ProjectDTO|null
  loadProject: (id: number|null) => Promise<ProjectDTO|null>
  hasPermission: (permission:UserPermissions)=>boolean
}

export const projectContext = createContext<ProjectContext>({
  getProject: () => null,
  project: null,
  loadProject: async (id: number|null) => null,
  hasPermission: (permission:UserPermissions)=>false,
});

interface ProjectContextProviderProps {
  children: ReactElement
}

function ProjectContextProvider({children}:ProjectContextProviderProps) {

  const [project, setProject] = useState<ProjectDTO|null>(parseProjectCookie())
  const {user} = useContext(authContext)

  useEffect(()=>{
    // отслеживать изменение пользователя:
    // если пользователь пустой (выполнен выход) - сбросить проект
    loadProject(user?parseIdCookie():null)
  }, [user])

  // парсинг проекта из куки
  function parseProjectCookie(): ProjectDTO|null {
    return parseJsonOrNull(getCookie(C_PROJECT_DATA))
  }
  // парсинг id проекта из куки
  function parseIdCookie(): number|null {
    return parseInt(getCookie(C_SELECTED_PROJECT_ID))
  }
  // записать id в куки
  function setIdCookie(id: number|null){
    setCookie(C_SELECTED_PROJECT_ID, `${id ?? ''}`, id?10:0)
  }
  // записать данные проекта в куки
  function setProjectDataCookie(project: ProjectDTO|null){
    setCookie(C_PROJECT_DATA,project?JSON.stringify(project):'', project?300:0)
  }

  const getProjectFn = () => user?getProject:getPublicProject
  
  // загрузка проекта по id - возвращает проект|null
  async function loadProject(id: number|null) {
    
    // переменная с результатом
    var res: ProjectDTO|null = null
    
    try{
      // если есть id - отправить api запрос
      if (id) res = await getProjectFn()(id)
    } catch(e:any){
      // обработка-выброс исключения
      throw e
    } finally {
      // записать|очистить данные
      setProject(res)
      if(id)
        setIdCookie(id)
      setProjectDataCookie(res)
    }
    
    return res
  }

  // получить разрешения - из данных куки (куки обновляются быстрее чем состояние)
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
          getProject: parseProjectCookie,
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
