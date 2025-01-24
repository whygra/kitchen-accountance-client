import { useHotkeys } from "react-hotkeys-hook"

export default function useFormHotkeys(addFormFn: ()=>void, rmvFormFn: ()=>void){
      useHotkeys('alt+a', () => addFormFn(), { scopes: ['settings'] })
      useHotkeys('alt+x', () => rmvFormFn(), { scopes: ['settings'] })
}