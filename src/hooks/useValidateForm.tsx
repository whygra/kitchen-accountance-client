import { FormEvent, useEffect, useState } from "react"

export default function useValidateForm(commitFn: ()=>Promise<void>){
  // свойство - деактивировать форму
  const [disabled, setDisabled] = useState(false)
  const [validated, setValidated] = useState(false)
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
    commitFn().then(()=>setDisabled(false))
  };

    return {disabled, validated, handleSubmit}
}