import { Button, Image } from "react-bootstrap";
import {
    ErrorBoundary,
    FallbackProps,
    useErrorBoundary,
  } from "react-error-boundary";
import { useContext, useEffect, useState } from "react";
import { appContext } from "../context/AppContextProvider";
import { ErrorView } from "./ErrorView";
import Loading from "./shared/Loading";
import { useSearchParams } from "react-router-dom";
import { C_ACCESS_TOKEN, getCookie } from "../cookies";
import { authContext } from "../context/AuthContextProvider";

  
  export function VerifyEmail() {
    const {updateUserData} = useContext(authContext)
    const [awaitingResponse, setAwaitingResponse] = useState(false)

    const [params] = useSearchParams()

    const [resData, setResData] = useState<any|null>()

    useEffect(()=>{
      const url = params.get('verification_url')
      if (!url)
        throw new Error('404')

      verify(decodeURI(url))
    }, [])
    
    async function verify(url: string) {
      setAwaitingResponse(true)
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+getCookie(C_ACCESS_TOKEN)
        },
      })
      const data = await response.json().catch(e=>null)
      if (!response.ok)
        setResData({
          message: `Не удалось подтвердить почту: ${data?.message}`,
        })
      else{
        setResData(data)
        updateUserData()
      }
      
      setAwaitingResponse(false)

    }

    return awaitingResponse
      ?
      (<Loading/>)
      : (
      <>
        <h4>{resData?.message}</h4>
      </>
      )
  }