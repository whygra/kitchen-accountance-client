import { Button, Container, Image } from "react-bootstrap";
import {
    ErrorBoundary,
    FallbackProps,
    useErrorBoundary,
  } from "react-error-boundary";
import { resendVerificationEmail } from "../api/auth";
import { useContext, useState } from "react";
import { appContext } from "../context/AppContextProvider";
import { ErrorView } from "./ErrorView";

  
  export function EmailVerificationRequired() {
    const [awaitingResponse, setAwaitingResponse] = useState(false)
    
    const {showModal} = useContext(appContext)

    async function resend() {
      setAwaitingResponse(true)
      await resendVerificationEmail()
        .then(res=>showModal(<>{res?.message}</>))
        .catch(err=>showModal(<ErrorView error={err}/>))
      setAwaitingResponse(false)
    }

    return (
      <Container>
      <h5>
        <Button 
          disabled={awaitingResponse} 
          onClick={resend}>
            Отправить ссылку 
            {awaitingResponse
              ? <Image height={'20px'} className="ms-1" src='/icons/icons8-loading.gif'/> 
              :''
            }
          </Button>
        </h5>

      </Container>
    );
  }