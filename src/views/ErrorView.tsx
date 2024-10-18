import {
    ErrorBoundary,
    FallbackProps,
    useErrorBoundary,
  } from "react-error-boundary";

  interface ErrorViewProps {
    error: any
  }
  
  export function ErrorView({ error }: ErrorViewProps) {
    return (
      <>
      <h4>{error?.name}</h4>
      <h5>{error?.message}</h5>
      <ul>
        {error?.errors?.map((e:string)=>{return(<li>{e}</li>)})}
      </ul>
      </>
    );
  }