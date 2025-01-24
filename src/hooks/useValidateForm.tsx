import { FormEvent, useContext, useEffect, useState } from "react"
import { appContext } from "../context/AppContextProvider";
import { ErrorView } from "../views/ErrorView";
import { ErrorBoundary } from "react-error-boundary";

export default function useValidateForm(commitFn: ()=>Promise<void>){
  // свойство - деактивировать форму
  const [disabled, setDisabled] = useState(false)
  const [validated, setValidated] = useState(false)
  const {showModal} = useContext(appContext)
  const handleSubmit = (event:FormEvent) => {
    
    // предотвратить поведение формы по умолчанию
    event.preventDefault();
    
    const form = event.currentTarget as any;
    // валидация
    if (form.checkValidity() === false) {
      // если не валидна - отмена отправки
      event.stopPropagation();
      setValidated(true);
      return
    }

    // вызов функции отправки
    setDisabled(true)
    commitFn().catch(e=>{showModal(<ErrorView error={e}/>)}).finally(()=>setDisabled(false))
  };

    return {disabled, validated, handleSubmit}
}